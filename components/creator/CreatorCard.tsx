'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Verified, Users, Heart } from 'lucide-react'

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
        className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#1a1a1a] transition-colors group"
      >
        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-[#2d2d2d] flex-shrink-0">
          <div className="w-full h-full bg-gradient-to-br from-[#ff6b9d] to-[#e91e63] flex items-center justify-center text-white font-semibold">
            {creator.displayName[0]}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <span className="text-white font-medium truncate group-hover:text-[#ff6b9d] transition-colors">
              {creator.displayName}
            </span>
            {creator.isVerified && (
              <Verified size={14} className="text-[#ff6b9d] fill-[#ff6b9d]" />
            )}
          </div>
          <p className="text-sm text-gray-500 truncate">@{creator.username}</p>
        </div>
        <div className="text-right">
          <p className="text-[#ff6b9d] font-semibold">${creator.lowestTierPrice}</p>
          <p className="text-xs text-gray-500">/month</p>
        </div>
      </Link>
    )
  }

  return (
    <div className="bg-[#121212] rounded-xl overflow-hidden border border-[#2d2d2d] hover:border-[#ff6b9d]/50 transition-all duration-300 group">
      {/* Banner */}
      <div className="relative h-32 bg-gradient-to-r from-[#ff6b9d]/30 to-[#e91e63]/30">
        {creator.bannerImage ? (
          <Image
            src={creator.bannerImage}
            alt={`${creator.displayName}'s banner`}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-[#ff6b9d]/20 to-[#e91e63]/20" />
        )}
        
        {/* NSFW Badge */}
        {creator.isNSFW && (
          <div className="absolute top-3 right-3 px-2 py-1 bg-red-500/80 text-white text-xs font-semibold rounded-full">
            18+
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-4 pb-4">
        {/* Avatar & Stats */}
        <div className="relative flex justify-between items-end -mt-10 mb-3">
          <div className="relative">
            <div className="w-20 h-20 rounded-full border-4 border-[#121212] overflow-hidden bg-[#2d2d2d]">
              <div className="w-full h-full bg-gradient-to-br from-[#ff6b9d] to-[#e91e63] flex items-center justify-center text-white text-2xl font-bold">
                {creator.displayName[0]}
              </div>
            </div>
            {creator.isVerified && (
              <div className="absolute -bottom-1 -right-1 bg-[#121212] rounded-full p-0.5">
                <Verified size={20} className="text-[#ff6b9d] fill-[#ff6b9d]" />
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 mb-2">
            <div className="text-center">
              <p className="text-white font-semibold">
                {(creator.followerCount / 1000).toFixed(1)}K
              </p>
              <p className="text-xs text-gray-500">followers</p>
            </div>
            <div className="text-center">
              <p className="text-white font-semibold">
                {(creator.subscriptionCount / 1000).toFixed(1)}K
              </p>
              <p className="text-xs text-gray-500">subscribers</p>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="mb-3">
          <h3 className="text-white font-semibold text-lg flex items-center gap-2">
            {creator.displayName}
            {creator.isVerified && <Verified size={16} className="text-[#ff6b9d] fill-[#ff6b9d]" />}
          </h3>
          <p className="text-gray-500 text-sm">@{creator.username}</p>
          <p className="text-gray-400 text-sm mt-2 line-clamp-2">{creator.bio}</p>
        </div>

        {/* Preview Images */}
        {creator.previewImages && creator.previewImages.length > 0 && (
          <div className="flex gap-2 mb-4">
            {creator.previewImages.slice(0, 3).map((img, i) => (
              <div 
                key={i} 
                className="w-16 h-16 rounded-lg bg-[#2d2d2d] overflow-hidden flex-shrink-0"
              >
                <div className="w-full h-full bg-gradient-to-br from-[#ff6b9d]/20 to-[#e91e63]/20 flex items-center justify-center">
                  <Heart size={16} className="text-[#ff6b9d]" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Subscribe Button */}
        <Link
          href={`/creator/${creator.username}/subscribe`}
          className="block w-full py-3 bg-[#ff6b9d] hover:bg-[#f06292] text-white text-center font-semibold rounded-lg transition-colors"
        >
          Subscribe ${creator.lowestTierPrice}/mo
        </Link>
      </div>
    </div>
  )
}
