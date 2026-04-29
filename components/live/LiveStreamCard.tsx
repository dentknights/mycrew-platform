'use client'

import Link from 'next/link'
import { Users, Play } from 'lucide-react'

interface Stream {
  id: string
  title: string
  creator: {
    id: string
    username: string
    displayName: string
    avatar: string
    isVerified: boolean
  }
  thumbnail: string
  viewerCount: number
  startedAt: string
  isNSFW: boolean
  category: string
}

interface LiveStreamCardProps {
  stream: Stream
}

export function LiveStreamCard({ stream }: LiveStreamCardProps) {
  return (
    <Link href={`/live/${stream.id}`} className="group block">
      <div className="bg-[#121212] rounded-xl overflow-hidden border border-[#2d2d2d] hover:border-[#ff6b9d]/50 transition-all duration-300">
        {/* Thumbnail */}
        <div className="relative aspect-video bg-gradient-to-br from-[#ff6b9d]/20 to-[#e91e63]/20">
          {/* Live Badge */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-red-500 px-2 py-1 rounded-full">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span className="text-white text-xs font-bold">LIVE</span>
            </div>
            {stream.isNSFW && (
              <div className="bg-red-500/80 text-white text-xs font-bold px-2 py-1 rounded-full">
                18+
              </div>
            )}
          </div>

          {/* Viewer Count */}
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 px-2 py-1 rounded-full">
            <Users size={14} className="text-white" />
            <span className="text-white text-xs font-medium">
              {stream.viewerCount.toLocaleString()}
            </span>
          </div>

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
            <div className="w-16 h-16 rounded-full bg-[#ff6b9d] flex items-center justify-center">
              <Play size={32} className="text-white ml-1" />
            </div>
          </div>

          {/* Category */}
          <div className="absolute bottom-3 left-3">
            <span className="px-2 py-1 bg-black/60 text-white text-xs rounded-full">
              {stream.category}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="text-white font-semibold mb-2 line-clamp-1 group-hover:text-[#ff6b9d] transition-colors">
            {stream.title}
          </h3>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff6b9d] to-[#e91e63] flex items-center justify-center text-white text-sm font-bold">
              {stream.creator.displayName[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">
                {stream.creator.displayName}
              </p>
              <p className="text-gray-500 text-xs">Started {stream.startedAt}</p>
            </div>
            {stream.creator.isVerified && (
              <span className="text-[#ff6b9d]">✓</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
