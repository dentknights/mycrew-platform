'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Verified, Users, Heart, Lock } from 'lucide-react'

interface Creator {
  id: string
  username: string
  displayName: string
  avatar: string
  bannerImage?: string
  bio: string
  isNSFW: boolean
  isVerified: boolean
  followerCount: number
  subscriptionCount: number
  lowestTierPrice: number
  previewImages?: string[]
}

interface CreatorCardProps {
  creator: Creator
  compact?: boolean
}

export function CreatorCard({ creator, compact = false }: CreatorCardProps) {
  if (compact) {
    return (
      <Link 
        href={`/creator/${creator.username}`}
        className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#161616] transition-all group"
      >
        <div className="relative w-11 h-11 rounded-full overflow-hidden bg-[#1c1c1c] flex-shrink-0 ring-2 ring-[#262626] group-hover:ring-[#363636] transition-all">
          <div className="w-full h-full bg-gradient-to-br from-[#1c1c1c] to-[#262626] flex items-center justify-center text-white font-semibold text-sm">
            {creator.displayName[0]}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-white font-medium text-sm truncate group-hover:text-[#0095f6] transition-colors">
              {creator.displayName}
            </span>
            {creator.isVerified && (
              <Verified size={14} className="text-[#0095f6] fill-[#0095f6]" />
            )}
          </div>
          <p className="text-xs text-[#6b7280] truncate">@{creator.username}</p>
        </div>
        <div className="text-right">
          <p className="text-white font-semibold text-sm">${creator.lowestTierPrice}</p>
          <p className="text-xs text-[#6b7280]">/mo</p>
        </div>
      </Link>
    )
  }

  return (
    <div className="bg-[#111111] rounded-xl overflow-hidden border border-[#1f1f1f] hover:border-[#262626] transition-all duration-200 group">
      {/* Banner */}
      <div className="relative h-28 bg-gradient-to-r from-[#161616] to-[#1c1c1c]">
        {creator.bannerImage ? (
          <Image
            src={creator.bannerImage}
            alt={`${creator.displayName}'s banner`}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-[#1c1c1c] to-[#262626]" />
        )}
        
        {/* NSFW Badge */}
        {creator.isNSFW && (
          <div className="absolute top-3 right-3 px-2 py-1 bg-[#ff3b30]/10 border border-[#ff3b30]/20 text-[#ff3b30] text-[10px] font-bold uppercase tracking-wider rounded">
            18+
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-4 pb-4">
        {/* Avatar & Stats */}
        <div className="relative flex justify-between items-end -mt-8 mb-3">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-[#111111] overflow-hidden bg-[#1c1c1c] ring-1 ring-[#262626]">
              <div className="w-full h-full bg-gradient-to-br from-[#1c1c1c] to-[#262626] flex items-center justify-center text-white text-xl font-bold">
                {creator.displayName[0]}
              </div>
            </div>
            {creator.isVerified && (
              <div className="absolute -bottom-0.5 -right-0.5 bg-[#111111] rounded-full p-0.5">
                <Verified size={18} className="text-[#0095f6] fill-[#0095f6]" />
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 mb-1">
            <div className="text-center">
              <p className="text-white font-bold text-sm">
                {(creator.followerCount / 1000).toFixed(1)}K
              </p>
              <p className="text-[10px] text-[#6b7280] uppercase tracking-wider">followers</p>
            </div>
            <div className="text-center">
              <p className="text-white font-bold text-sm">
                {(creator.subscriptionCount / 1000).toFixed(1)}K
              </p>
              <p className="text-[10px] text-[#6b7280] uppercase tracking-wider">subs</p>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="mb-3">
          <h3 className="text-white font-bold text-base flex items-center gap-1.5">
            {creator.displayName}
            {creator.isVerified && <Verified size={14} className="text-[#0095f6] fill-[#0095f6]" />}
          </h3>
          <p className="text-[#6b7280] text-xs">@{creator.username}</p>
          <p className="text-[#9ca3af] text-sm mt-2 line-clamp-2 leading-relaxed">{creator.bio}</p>
        </div>

        {/* Preview Images */}
        {creator.previewImages && creator.previewImages.length > 0 && (
          <div className="flex gap-2 mb-4">
            {creator.previewImages.slice(0, 3).map((img, i) => (
              <div 
                key={i} 
                className="w-14 h-14 rounded-lg bg-[#1c1c1c] overflow-hidden flex-shrink-0 ring-1 ring-[#262626]"
              >
                <div className="w-full h-full bg-gradient-to-br from-[#1c1c1c] to-[#262626] flex items-center justify-center">
                  <Lock size={14} className="text-[#6b7280]" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Subscribe Button */}
        <Link
          href={`/creator/${creator.username}/subscribe`}
          className="block w-full py-2.5 bg-[#0095f6] hover:bg-[#1877f2] text-white text-center font-semibold rounded-lg transition-all text-sm"
        >
          Subscribe ${creator.lowestTierPrice}/mo
        </Link>
      </div>
    </div>
  )
}
