import { NextRequest, NextResponse } from 'next/server'

// Mock data
const mockListings = [
  {
    id: '1',
    title: 'Photo Shoot Collaboration',
    description: 'Looking for a creator to do a joint photoshoot',
    price: 500,
    creator: {
      id: '1',
      username: 'jessicamodel',
      displayName: 'Jessica Model',
      avatar: null,
      isVerified: true,
    },
    collaborationType: ['photo-shoot'],
    isRemote: true,
    isNSFW: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Live Stream Guest',
    description: 'Join me for a Q&A live stream',
    price: 200,
    creator: {
      id: '2',
      username: 'mikefitness',
      displayName: 'Mike Fitness',
      avatar: null,
      isVerified: true,
    },
    collaborationType: ['live-stream'],
    isRemote: true,
    isNSFW: false,
    createdAt: new Date().toISOString(),
  },
]

// GET /api/collaborations - List all collaboration listings
export async function GET(req: NextRequest) {
  try {
    return NextResponse.json({
      listings: mockListings,
      pagination: {
        page: 1,
        limit: 20,
        total: mockListings.length,
        pages: 1
      }
    })
  } catch (error) {
    console.error('Error fetching collaborations:', error)
    return NextResponse.json(
      { error: 'Failed to fetch collaborations' },
      { status: 500 }
    )
  }
}

// POST /api/collaborations - Create new collaboration listing
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    // Mock creation
    const newListing = {
      id: Date.now().toString(),
      ...body,
      creator: {
        id: '1',
        username: 'currentuser',
        displayName: 'Current User',
        avatar: null,
        isVerified: true,
      },
      createdAt: new Date().toISOString(),
    }
    
    return NextResponse.json({
      success: true,
      listing: newListing
    })
  } catch (error) {
    console.error('Error creating collaboration:', error)
    return NextResponse.json(
      { error: 'Failed to create collaboration' },
      { status: 500 }
    )
  }
}
