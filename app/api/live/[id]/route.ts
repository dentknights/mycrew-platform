import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    const streamId = params.id

    // Get stream details
    const stream = await prisma.content.findUnique({
      where: { id: streamId },
      include: {
        creator: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatar: true,
            isVerified: true,
            creatorProfile: {
              select: {
                isNSFW: true,
              },
            },
          },
        },
      },
    })

    if (!stream) {
      return NextResponse.json({ error: 'Stream not found' }, { status: 404 })
    }

    // Check if user can view (subscription check, NSFW check, etc.)
    const canView = await checkViewPermission(session?.user?.id, stream)

    if (!canView.allowed) {
      return NextResponse.json(
        { error: canView.reason },
        { status: 403 }
      )
    }

    return NextResponse.json({
      stream: {
        id: stream.id,
        title: stream.title,
        creator: stream.creator,
        isLive: true, // Would check actual status
        viewerCount: 0, // Would get from Redis/real-time service
        startedAt: stream.createdAt,
        isNSFW: stream.creator.creatorProfile?.isNSFW || false,
      },
    })

  } catch (error) {
    console.error('Error fetching stream:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stream' },
      { status: 500 }
    )
  }
}

async function checkViewPermission(userId: string | undefined, stream: any) {
  // Public stream - anyone can view
  if (stream.isPublic) {
    return { allowed: true }
  }

  // NSFW stream - check age verification
  if (stream.creator.creatorProfile?.isNSFW) {
    if (!userId) {
      return { allowed: false, reason: 'Login required for 18+ content' }
    }
    // Would check age verification here
  }

  // Private/PPV stream - check subscription
  if (!userId) {
    return { allowed: false, reason: 'Login required' }
  }

  const subscription = await prisma.subscription.findFirst({
    where: {
      fanId: userId,
      tierId: { in: stream.tierAccess },
      status: 'active',
    },
  })

  if (!subscription) {
    return { allowed: false, reason: 'Subscription required' }
  }

  return { allowed: true }
}
