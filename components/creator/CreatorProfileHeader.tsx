'use client'

import Link from 'next/link'
import { Verified, Users, Image as ImageIcon, Heart } from 'lucide-react'

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
  postCount?: number
  mediaCount?: number
}

interface CreatorProfileHeaderProps {
  creator: Creator
}

export function CreatorProfileHeader({ creator }: CreatorProfileHeaderProps) {
  return (
    <div className="bg-[#121212] rounded-xl overflow-hidden border border-[#2d2d2d]">
      {/* Banner */}
      <div className="relative h-48 md:h-64">
        <div className="absolute inset-0 bg-gradient-to-r from-[#ff6b9d]/40 to-[#e91e63]/40" />
        {creator.bannerImage && (
          <div className="absolute inset-0 bg-cover bg-center opacity-50" />
        )}
        
        {/* Back Button */}
        <Link
          href={`/creator/${creator.username}`}
          className="absolute top-4 left-4 px-4 py-2 bg-black/60 hover:bg-black/80 text-white rounded-full text-sm font-medium transition-colors"
        >
          ← Back to Profile
        </Link>
      </div>

      {/* Profile Info */}
      <div className="px-6 pb-6">
        <div className="relative flex flex-col md:flex-row md:items-end -mt-16 mb-4">
          {/* Avatar */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-[#121212] overflow-hidden bg-gradient-to-br from-[#ff6b9d] to-[#e91e63] flex items-center justify-center text-white text-4xl font-bold">
              {creator.displayName[0]}
            </div>
            {creator.isVerified && (
              <div className="absolute -bottom-1 -right-1 bg-[#121212] rounded-full p-1">
                <Verified size={28} className="text-[#ff6b9d] fill-[#ff6b9d]" />
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8 mt-4 md:mt-0 md:ml-auto">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">
                {creator.postCount || 0}
              </p>
              <p className="text-sm text-gray-500">Posts</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">
                {creator.mediaCount || 0}
              </p>
              <p className="text-sm text-gray-500">Media</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">
                {(creator.followerCount / 1000).toFixed(1)}K
              </p>
              <p className="text-sm text-gray-500">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">
                {(creator.subscriptionCount / 1000).toFixed(1)}K
              </p>
              <p className="text-sm text-gray-500">Subscribers</p>
            </div>
          </div>
        </div>

        {/* Name & Bio */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            {creator.displayName}
            {creator.isVerified && (
              <Verified size={20} className="text-[#ff6b9d] fill-[#ff6b9d]" />
            )}
          </h1>
          <p className="text-gray-500">@{creator.username}</p>
        </div>

        <p className="text-gray-300 mb-6 max-w-2xl">{creator.bio}</p>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button className="flex-1 md:flex-none px-6 py-3 bg-[#ff6b9d] hover:bg-[#f06292] text-white font-semibold rounded-full transition-colors">
            Subscribe
          </button>
          <button className="px-6 py-3 bg-[#1a1a1a] hover:bg-[#2d2d2d] text-white font-semibold rounded-full transition-colors border border-[#2d2d2d]">
            Message
          </button>
          <button className="px-4 py-3 bg-[#1a1a1a] hover:bg-[#2d2d2d] text-white rounded-full transition-colors border border-[#2d2d2d]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
