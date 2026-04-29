# MyCrew Rising Star Bonus Program Specification

## Overview
The Rising Star monthly bonus program rewards creators who bring new paid users to the MyCrew platform. This is a **growth incentive program** designed to accelerate platform adoption.

## Launch Timeline
**Start Date**: 6 months after platform launch
**Reason**: Allow time to build creator base and establish platform stability

## Rollout Criteria (6-Month Mark)
- Minimum 200 active creators
- 10,000+ total registered users
- Stable payment processing
- Support team trained on bonus program

## Bonus Structure

### Monthly Prizes
| Rank | Min Paid Signups | Bonus |
|------|------------------|-------|
| **1st Place** | 50 | **$500** |
| **2nd Place** | 40 | **$250** |
| **3rd Place** | 30 | **$150** |
| **Top 10** (4-10) | 20 | **$75 each** |
| **Top 50** (11-50) | 10 | **$25 each** |

**Total Monthly Prize Pool**: ~$2,725

### Qualification Requirements
- Creator must be verified
- Account in good standing (no violations)
- Minimum 1,000 followers
- Active for at least 30 days

### Referral Rules
- Unique referral code per creator
- Referred user must subscribe to a paid tier
- Free trial conversions count after payment
- No self-referrals (automated detection)
- No duplicate accounts (fingerprinting)

## How It Works

### Month 1-5: Pre-Launch
- Track referrals in background
- Show creators their stats (unpaid)
- Build anticipation
- No public leaderboard

### Month 6+: Active Program
1. **1st of Month**: Leaderboard resets
2. **Daily**: Real-time stats update
3. **End of Month**: Final rankings calculated
4. **3rd of Next Month**: Bonuses paid via Stripe

### Tracking
```
New Signup → Uses referral code → Subscribes → Counts toward referrer
```

## Anti-Fraud Measures
- IP address analysis
- Device fingerprinting
- Payment method verification
- Behavioral pattern detection
- Manual review for top 10

## Communication

### To Creators
- Email announcement at month 5
- Dashboard notification
- Monthly leaderboard email
- Winner announcements (social media)

### To Users
- "Referred by" field at signup
- Transparent about referral program

## Budget Planning

### Year 1 (Months 6-12)
- 7 months × $2,725 = **$19,075**

### Year 2+
- 12 months × $2,725 = **$32,700/year**

### ROI Calculation
- Average paid signup: $15/month
- Platform fee (10%): $1.50/month
- Break-even: 1,818 new paid signups/year
- Target: 5,000+ new paid signups/year

## Technical Implementation

### Database Tables
- `Referral` - Track referrals
- `RisingStarLeaderboard` - Monthly rankings
- `BonusConfiguration` - Prize tiers

### API Endpoints
- `GET /api/referrals` - Creator's stats
- `GET /api/rising-star` - Leaderboard
- `POST /api/rising-star/track` - Track conversion
- `PATCH /api/referrals` - Claim bonus

### Background Jobs
- Daily: Update leaderboard rankings
- Monthly: Calculate winners
- Monthly: Process bonus payments

## Future Enhancements

### Year 2
- Increase prize pool based on growth
- Add weekly mini-challenges
- Seasonal tournaments
- Regional leaderboards

### Year 3+
- Creator tiers (different prize pools)
- NFT badges for winners
- Exclusive events for top referrers

## Success Metrics

### Program Health
- 50+ creators participating monthly
- 500+ new paid signups/month
- <5% fraud rate
- 90%+ creator satisfaction

### Platform Growth
- 20% MoM user growth
- 15% referral conversion rate
- $50+ LTV for referred users

---

**Note**: This program starts 6 months after platform launch. Until then, track referrals but don't display or pay bonuses.
