import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

// GET /api/referrals - Get user's referral stats
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const userId = session.user.id
    
    // Get or create referral code
    let referralCode = await prisma.referral.findFirst({
      where: { referrerId: userId },
      select: { code: true }
    })
    
    if (!referralCode) {
      // Generate unique code
      const code = `mycrew_${crypto.randomBytes(4).toString('hex')}`
      
      // Create placeholder referral record
      await prisma.referral.create({
        data: {
          referrerId: userId,
          referredId: `placeholder_${Date.now()}`, // Will be updated when someone uses it
          code,
          status: 'pending',
        }
      })
      
      referralCode = { code }
    }
    
    // Get referral stats
    const [
      totalReferrals,
      convertedReferrals,
      currentMonthStats,
      allTimeStats
    ] = await Promise.all([
      prisma.referral.count({
        where: { referrerId: userId }
      }),
      prisma.referral.count({
        where: { 
          referrerId: userId,
          status: 'converted'
        }
      }),
      prisma.risingStarLeaderboard.findFirst({
        where: {
          creatorId: userId,
          month: new Date().getMonth(),
          year: new Date().getFullYear()
        }
      }),
      prisma.risingStarLeaderboard.findMany({
        where: { creatorId: userId },
        orderBy: { createdAt: 'desc' },
        take: 12
      })
    ])
    
    // Calculate total bonuses earned
    const totalBonusesEarned = allTimeStats.reduce((sum, stat) => 
      sum + Number(stat.bonusEarned), 0
    )
    
    const totalBonusesPaid = allTimeStats.reduce((sum, stat) => 
      stat.bonusPaid ? sum + Number(stat.bonusEarned) : sum, 0
    )
    
    return NextResponse.json({
      referralCode: referralCode?.code,
      referralLink: `${process.env.NEXT_PUBLIC_APP_URL}/?ref=${referralCode?.code}`,
      stats: {
        totalReferrals,
        convertedReferrals,
        conversionRate: totalReferrals > 0 
          ? ((convertedReferrals / totalReferrals) * 100).toFixed(1)
          : 0,
        currentMonth: currentMonthStats || {
          newSignups: 0,
          paidSignups: 0,
          rank: null,
          bonusEarned: 0
        },
        allTime: {
          totalBonusesEarned,
          totalBonusesPaid,
          pendingPayout: totalBonusesEarned - totalBonusesPaid
        }
      }
    })
    
  } catch (error) {
    console.error('Error fetching referral stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch referral stats' },
      { status: 500 }
    )
  }
}

// POST /api/referrals/claim - Claim referral bonus
export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const userId = session.user.id
    const now = new Date()
    
    // Get unpaid bonuses
    const unpaidBonuses = await prisma.risingStarLeaderboard.findMany({
      where: {
        creatorId: userId,
        bonusEarned: { gt: 0 },
        bonusPaid: false
      }
    })
    
    if (unpaidBonuses.length === 0) {
      return NextResponse.json(
        { error: 'No bonuses available to claim' },
        { status: 400 }
      )
    }
    
    // Mark bonuses as paid
    const totalPayout = unpaidBonuses.reduce((sum, bonus) => 
      sum + Number(bonus.bonusEarned), 0
    )
    
    await prisma.risingStarLeaderboard.updateMany({
      where: {
        creatorId: userId,
        bonusPaid: false,
        bonusEarned: { gt: 0 }
      },
      data: {
        bonusPaid: true,
        paidAt: now
      }
    })
    
    // In real implementation, would trigger Stripe transfer here
    
    return NextResponse.json({
      success: true,
      payoutAmount: totalPayout,
      message: `Bonus of $${totalPayout} has been processed`
    })
    
  } catch (error) {
    console.error('Error claiming referral bonus:', error)
    return NextResponse.json(
      { error: 'Failed to claim bonus' },
      { status: 500 }
    )
  }
}
