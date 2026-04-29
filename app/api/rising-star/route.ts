import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

// GET /api/rising-star - Get current month's leaderboard
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const month = parseInt(searchParams.get('month') || new Date().getMonth().toString())
    const year = parseInt(searchParams.get('year') || new Date().getFullYear().toString())
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    
    const skip = (page - 1) * limit
    
    // Get leaderboard entries
    const [entries, total] = await Promise.all([
      prisma.risingStarLeaderboard.findMany({
        where: { month, year },
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
                  followerCount: true,
                }
              }
            }
          }
        },
        orderBy: [
          { rank: 'asc' },
          { paidSignups: 'desc' }
        ],
        skip,
        take: limit,
      }),
      prisma.risingStarLeaderboard.count({ where: { month, year } })
    ])
    
    // Get bonus configurations
    const bonusConfigs = await prisma.bonusConfiguration.findMany({
      where: { isActive: true },
      orderBy: { bonusAmount: 'desc' }
    })
    
    return NextResponse.json({
      leaderboard: entries,
      bonuses: bonusConfigs,
      month,
      year,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
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

// POST /api/rising-star/track - Track a new signup (called when user subscribes)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { referrerId, referredId, referralCode } = body
    
    if (!referrerId || !referredId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    const now = new Date()
    const month = now.getMonth()
    const year = now.getFullYear()
    
    // Create or update referral record
    await prisma.referral.upsert({
      where: { referredId },
      create: {
        referrerId,
        referredId,
        code: referralCode || `ref_${Date.now()}`,
        status: 'converted',
      },
      update: {
        status: 'converted',
      }
    })
    
    // Update or create leaderboard entry
    const leaderboardEntry = await prisma.risingStarLeaderboard.upsert({
      where: {
        creatorId_month_year: {
          creatorId: referrerId,
          month,
          year,
        }
      },
      create: {
        creatorId: referrerId,
        month,
        year,
        newSignups: 1,
        paidSignups: 1,
      },
      update: {
        newSignups: { increment: 1 },
        paidSignups: { increment: 1 },
      }
    })
    
    // Recalculate ranks for this month
    await recalculateRanks(month, year)
    
    // Check if creator qualifies for bonus
    await checkAndAssignBonus(referrerId, month, year)
    
    return NextResponse.json({
      success: true,
      leaderboardEntry
    })
    
  } catch (error) {
    console.error('Error tracking rising star signup:', error)
    return NextResponse.json(
      { error: 'Failed to track signup' },
      { status: 500 }
    )
  }
}

// Recalculate ranks for a given month
async function recalculateRanks(month: number, year: number) {
  const entries = await prisma.risingStarLeaderboard.findMany({
    where: { month, year },
    orderBy: { paidSignups: 'desc' }
  })
  
  for (let i = 0; i < entries.length; i++) {
    await prisma.risingStarLeaderboard.update({
      where: { id: entries[i].id },
      data: { rank: i + 1 }
    })
  }
}

// Check and assign bonus based on rank
async function checkAndAssignBonus(creatorId: string, month: number, year: number) {
  const entry = await prisma.risingStarLeaderboard.findUnique({
    where: {
      creatorId_month_year: {
        creatorId,
        month,
        year,
      }
    }
  })
  
  if (!entry || !entry.rank) return
  
  // Get bonus configurations
  const bonuses = await prisma.bonusConfiguration.findMany({
    where: { isActive: true },
    orderBy: { minPaidSignups: 'desc' }
  })
  
  // Find applicable bonus
  let applicableBonus = null
  
  for (const bonus of bonuses) {
    if (entry.paidSignups >= bonus.minPaidSignups) {
      // Check rank-based bonuses
      if (bonus.name.includes('1st') && entry.rank === 1) {
        applicableBonus = bonus
        break
      } else if (bonus.name.includes('2nd') && entry.rank === 2) {
        applicableBonus = bonus
        break
      } else if (bonus.name.includes('3rd') && entry.rank === 3) {
        applicableBonus = bonus
        break
      } else if (bonus.name.includes('Top 10') && entry.rank <= 10) {
        applicableBonus = bonus
        break
      } else if (bonus.name.includes('Top 50') && entry.rank <= 50) {
        applicableBonus = bonus
        break
      }
    }
  }
  
  if (applicableBonus && entry.bonusEarned < applicableBonus.bonusAmount) {
    await prisma.risingStarLeaderboard.update({
      where: { id: entry.id },
      data: { bonusEarned: applicableBonus.bonusAmount }
    })
  }
}
