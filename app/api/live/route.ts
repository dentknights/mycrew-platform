import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    // Build query
    const where: any = {
      type: 'live',
      // In real implementation, would check for active streams
      // For now, return recent streams
    }

    if (category && category !== 'All') {
      // Would filter by category
    }

    // Get live streams
    const streams = await prisma.content.findMany({
      where,
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
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
      skip: offset,
    })

    // Transform for frontend
    const formattedStreams = streams.map(stream => ({
      id: stream.id,
      title: stream.title,
      creator: {
        id: stream.creator.id,
        username: stream.creator.username,
        displayName: stream.creator.displayName,
        avatar: stream.creator.avatar,
        isVerified: stream.creator.isVerified,
      },
      thumbnail: stream.thumbnail || '/default-stream-thumb.jpg',
      viewerCount: 0, // Would get from real-time service
      startedAt: stream.createdAt,
      isNSFW: stream.creator.creatorProfile?.isNSFW || false,
      category: 'Just Chatting', // Would get from creator profile
    }))

    return NextResponse.json({
      streams: formattedStreams,
      total: formattedStreams.length,
    })

  } catch (error) {
    console.error('Error fetching streams:', error)
    return NextResponse.json(
      { error: 'Failed to fetch streams' },
      { status: 500 }
    )
  }
}
