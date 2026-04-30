import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const streamId = params.id

    // Mock stream data
    return NextResponse.json({
      stream: {
        id: streamId,
        title: 'Live Stream',
        creator: {
          id: '1',
          username: 'jessicamodel',
          displayName: 'Jessica Model',
          avatar: null,
          isVerified: true,
        },
        isLive: true,
        viewerCount: 1247,
        startedAt: new Date().toISOString(),
        isNSFW: false,
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
