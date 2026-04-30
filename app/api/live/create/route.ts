import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    // Mock session for now - implement auth later
    const session = { user: { id: 'test-user-id' } }
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { title, isNSFW, allowTips, allowBattle } = await req.json()

    // Generate unique stream ID
    const streamId = `stream_${Date.now()}`

    // Return stream configuration for WebRTC
    return NextResponse.json({
      success: true,
      stream: {
        id: streamId,
        title: title || 'Live Stream',
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
