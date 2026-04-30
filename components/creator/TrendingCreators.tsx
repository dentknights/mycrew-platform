'use client'

import Link from 'next/link'
import { TrendingUp, Users, Verified } from 'lucide-react'

interface Creator {
  id: string
  username: string
  displayName: string
  avatar: string
  isVerified: boolean
  followerCount: number
  subscriptionCount: number
  lowestTierPrice: number
}

interface TrendingCreatorsProps {
  creators: Creator[]
}

export function TrendingCreators({ creators }: TrendingCreatorsProps) {
  return (
    <div className="space-y-3">
      {creators.map((creator, index) => (
        <TrendingCreatorCard
          key={creator.id}
          creator={creator}
          rank={index + 1}
        />
      ))}
    </div>
  )
}

function TrendingCreatorCard({
  creator,
  rank,
}: {
  creator: Creator
  rank: number
}) {
  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'from-[#f5c518] to-[#f5c518]/60'
      case 2:
        return 'from-[#9ca3af] to-[#9ca3af]/60'
      case 3:
        return 'from-[#cd7f32] to-[#cd7f32]/60'
      default:
        return 'from-[#1c1c1c] to-[#262626]'
    }
  }

  const getRankTextColor = (rank: number) => {
    if (rank <= 3) return 'text-white'
    return 'text-[#6b7280]'
  }

  return (
    <Link
      href={`/creator/${creator.username}`}
      className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#161616] transition-all group"
    >
      {/* Rank Badge */}
      <div
        className={`w-8 h-8 rounded-lg bg-gradient-to-br ${getRankColor(
          rank
        )} flex items-center justify-center flex-shrink-0`}
      >
        <span className={`text-sm font-bold ${getRankTextColor(rank)}`}>{rank}</span>
      </div>

      {/* Avatar */}
      <div className="relative">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1c1c1c] to-[#262626] flex items-center justify-center text-white font-semibold ring-2 ring-[#262626] group-hover:ring-[#363636] transition-all">
          {creator.displayName[0]}
        </div>
        {creator.isVerified && (
          <div className="absolute -bottom-0.5 -right-0.5 bg-[#111111] rounded-full p-0.5">
            <Verified size={14} className="text-[#0095f6] fill-[#0095f6]" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-white font-medium text-sm truncate group-hover:text-[#0095f6] transition-colors">
            {creator.displayName}
          </span>
          {creator.isVerified && (
            <Verified size={14} className="text-[#0095f6] fill-[#0095f6] flex-shrink-0" />
          )}
        </div>
        <p className="text-[#6b7280] text-xs truncate">@{creator.username}</p>
        <div className="flex items-center gap-3 mt-1">
          <span className="flex items-center gap-1 text-xs text-[#6b7280]">
            <Users size={12} />
            {(creator.followerCount / 1000).toFixed(1)}K
          </span>
          <span className="flex items-center gap-1 text-xs text-[#00d4aa]">
            <TrendingUp size={12} />
            +{Math.floor(Math.random() * 20 + 5)}%
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="text-right flex-shrink-0">
        <p className="text-white font-semibold text-sm">${creator.lowestTierPrice}</p>
        <p className="text-[#6b7280] text-xs">/mo</p>
      </div>
    </Link>
  )
}
