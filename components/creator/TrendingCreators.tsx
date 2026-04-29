'use client'

import Link from 'next/link'
import { TrendingUp, Users } from 'lucide-react'

interface Creator {
  id: string
  username: string
  displayName: string
  avatar: string
  isVerified: boolean
  followerCount: number
}

interface TrendingCreatorsProps {
  creators: Creator[]
}

export function TrendingCreators({ creators }: TrendingCreatorsProps) {
  return (
    <div className="space-y-3">
      {creators.map((creator, index) => (
        <Link
          key={creator.id}
          href={`/creator/${creator.username}`}
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#1a1a1a] transition-colors group"
        >
          {/* Rank */}
          <div className={`
            w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
            ${index === 0 ? 'bg-yellow-500 text-black' : 
              index === 1 ? 'bg-gray-400 text-black' :
              index === 2 ? 'bg-orange-600 text-white' :
              'bg-[#2d2d2d] text-gray-400'}
          `}>
            {index + 1}
          </div>

          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff6b9d] to-[#e91e63] flex items-center justify-center text-white font-semibold">
            {creator.displayName[0]}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <p className="text-white font-medium truncate group-hover:text-[#ff6b9d] transition-colors">
              {creator.displayName}
            </p>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Users size={12} />
              <span>{(creator.followerCount / 1000).toFixed(1)}K</span>
            </div>
          </div>

          {/* Trend Icon */}
          <TrendingUp size={16} className="text-green-500" />
        </Link>
      ))}
    </div>
  )
}
