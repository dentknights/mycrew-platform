import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import { v4 as uuidv4 } from 'uuid'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { title, isNSFW, allowTips, allowBattle } = await req.json()

    // Verify user is a creator
    const creator = await prisma.creatorProfile.findUnique({
      where: { userId: session.user.id },
    })

    if (!creator) {
      return NextResponse.json({ error: 'Not a creator' }, { status: 403 })
    }

    // Generate unique stream ID
    const streamId = `stream_${uuidv4()}`

    // Create stream record in database
    const stream = await prisma.content.create({
      data: {
        id: streamId,
        creatorId: session.user.id,
        type: 'live',
        title: title || 'Live Stream',
        isPublic: !isNSFW,
        isPPV: false,
        watermarkEnabled: true,
        antiScreenshot: true,
      },
    })

    // Update creator status
    await prisma.creatorProfile.update({
      where: { userId: session.user.id },
      data: {
        // Could add isLive flag here
      },
    })

    // Return stream configuration for WebRTC
    return NextResponse.json({
      success: true,
      stream: {
        id: streamId,
        title: stream.title,
        wsUrl: process.env.WS_URL || 'wss://ws.mycrew.com',
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:stun1.l.google.com:19302' },
        ],
      },
    })

  } catch (error) {
    console.error('Error creating stream:', error)
    return NextResponse.json(
      { error: 'Failed to create stream' },
      { status: 500 }
    )
  }
}
