import { NextRequest, NextResponse } from 'next/server'

// Mock leaderboard data
const mockLeaderboard = [
  { rank: 1, creatorId: '1', creator: { username: 'jessicamodel', displayName: 'Jessica Model', avatar: null, isVerified: true }, paidSignups: 45, newSignups: 120, bonusEarned: 500 },
  { rank: 2, creatorId: '2', creator: { username: 'mikefitness', displayName: 'Mike Fitness', avatar: null, isVerified: true }, paidSignups: 38, newSignups: 95, bonusEarned: 250 },
  { rank: 3, creatorId: '3', creator: { username: 'sarahart', displayName: 'Sarah Art', avatar: null, isVerified: true }, paidSignups: 32, newSignups: 87, bonusEarned: 150 },
  { rank: 4, creatorId: '4', creator: { username: 'alexgaming', displayName: 'Alex Gaming', avatar: null, isVerified: false }, paidSignups: 28, newSignups: 76, bonusEarned: 75 },
  { rank: 5, creatorId: '5', creator: { username: 'taylorcooks', displayName: 'Taylor Cooks', avatar: null, isVerified: true }, paidSignups: 25, newSignups: 68, bonusEarned: 75 },
]

const mockBonuses = [
  { name: '1st Place', bonusAmount: 500, minPaidSignups: 20 },
  { name: '2nd Place', bonusAmount: 250, minPaidSignups: 15 },
  { name: '3rd Place', bonusAmount: 150, minPaidSignups: 10 },
  { name: 'Top 10', bonusAmount: 75, minPaidSignups: 5 },
  { name: 'Top 50', bonusAmount: 25, minPaidSignups: 1 },
]

// GET /api/rising-star - Get current month's leaderboard
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const month = parseInt(searchParams.get('month') || new Date().getMonth().toString())
    const year = parseInt(searchParams.get('year') || new Date().getFullYear().toString())
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    
    return NextResponse.json({
      leaderboard: mockLeaderboard,
      bonuses: mockBonuses,
      month,
      year,
      pagination: {
        page,
        limit,
        total: mockLeaderboard.length,
        pages: 1
      }
    })
  } catch (error) {
    console.error('Error fetching rising star leaderboard:', error)
    return NextResponse.json(
      { error: 'Failed to fetch leaderboard' },
      { status: 500 }
    )
  }
}

// POST /api/rising-star/track - Track a new signup
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { referrerId, referredId } = body
    
    if (!referrerId || !referredId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    return NextResponse.json({
      success: true,
      message: 'Signup tracked successfully'
    })
  } catch (error) {
    console.error('Error tracking rising star signup:', error)
    return NextResponse.json(
      { error: 'Failed to track signup' },
      { status: 500 }
    )
  }
}
