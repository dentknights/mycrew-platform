import { NextRequest, NextResponse } from 'next/server'

// Mock data for now
const mockReferralStats = {
  referralCode: 'mycrew_brooklynn2024',
  referralLink: 'http://100.98.72.30:3005/?ref=mycrew_brooklynn2024',
  stats: {
    totalReferrals: 12,
    convertedReferrals: 8,
    conversionRate: '66.7',
    currentMonth: {
      newSignups: 3,
      paidSignups: 2,
      rank: null,
      bonusEarned: 0
    },
    allTime: {
      totalBonusesEarned: 0,
      totalBonusesPaid: 0,
      pendingPayout: 0
    }
  }
}

// GET /api/referrals - Get user's referral stats
export async function GET(req: NextRequest) {
  try {
    // Return mock data for now
    return NextResponse.json(mockReferralStats)
  } catch (error) {
    console.error('Error fetching referral stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch referral stats' },
      { status: 500 }
    )
  }
}

// PATCH /api/referrals - Claim referral bonus
export async function PATCH(req: NextRequest) {
  try {
    return NextResponse.json({
      success: true,
      message: 'Bonus program starts in 6 months'
    })
  } catch (error) {
    console.error('Error claiming referral bonus:', error)
    return NextResponse.json(
      { error: 'Failed to claim bonus' },
      { status: 500 }
    )
  }
}
