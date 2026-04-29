'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, MessageCircle, Lock, Play, Eye } from 'lucide-react'

interface ContentItem {
  id: string
  creator: {
    id: string
    username: string
    displayName: string
    avatar: string
    isVerified: boolean
  }
  type: 'image' | 'video' | 'post'
  thumbnail: string
  isLocked: boolean
  ppvPrice?: number
  likes: number
  comments: number
  caption: string
  createdAt: string
}

interface ContentFeedProps {
  content: ContentItem[]
}

export function ContentFeed({ content }: ContentFeedProps) {
  return (
    <div className="space-y-6">
      {content.map((item) => (
        <ContentCard key={item.id} item={item} />
      ))}
    </div>
  )
}

function ContentCard({ item }: { item: ContentItem }) {
  return (
    <div className="bg-[#121212] rounded-xl overflow-hidden border border-[#2d2d2d]">
      {/* Creator Header */}
      <div className="flex items-center justify-between p-4">
        <Link 
          href={`/creator/${item.creator.username}`}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff6b9d] to-[#e91e63] flex items-center justify-center text-white font-semibold">
            {item.creator.displayName[0]}
          </div>
          <div>
            <p className="text-white font-medium hover:text-[#ff6b9d] transition-colors">
              {item.creator.displayName}
            </p>
            <p className="text-sm text-gray-500">{item.createdAt}</p>
          </div>
        </Link>
        
        <button className="text-gray-500 hover:text-white">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="relative">
        {item.isLocked ? (
          <LockedContent item={item} />
        ) : (
          <UnlockedContent item={item} />
        )}
      </div>

      {/* Caption */}
      <div className="px-4 py-3">
        <p className="text-gray-300">
          <Link href={`/creator/${item.creator.username}`} className="text-white font-medium hover:text-[#ff6b9d]">
            {item.creator.displayName}
          </Link>{' '}
          {item.caption}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between px-4 pb-4">
        <div className="flex items-center gap-6">
          <button className="flex items-center gap-2 text-gray-400 hover:text-[#ff6b9d] transition-colors">
            <Heart size={22} />
            <span className="text-sm">{item.likes.toLocaleString()}</span>
          </button>
          <button className="flex items-center gap-2 text-gray-400 hover:text-[#ff6b9d] transition-colors">
            <MessageCircle size={22} />
            <span className="text-sm">{item.comments.toLocaleString()}</span>
          </button>
          <button className="flex items-center gap-2 text-gray-400 hover:text-[#ff6b9d] transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>
        <button className="text-gray-400 hover:text-[#ff6b9d] transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>
      </div>
    </div>
  )
}

function LockedContent({ item }: { item: ContentItem }) {
  return (
    <div className="relative aspect-[4/5] bg-[#1a1a1a]">
      {/* Blurred Preview */}
      <div className="absolute inset-0 blur-xl opacity-50">
        <div className="w-full h-full bg-gradient-to-br from-[#ff6b9d]/30 to-[#e91e63]/30" />
      </div>
      
      {/* Lock Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60">
        <div className="w-16 h-16 rounded-full bg-[#ff6b9d]/20 flex items-center justify-center mb-4">
          <Lock size={32} className="text-[#ff6b9d]" />
        </div>
        
        <p className="text-white font-semibold text-lg mb-2">
          Unlock this {item.type}
        </p>
        
        {item.ppvPrice && (
          <div className="text-center">
            <p className="text-3xl font-bold text-white mb-1">
              ${item.ppvPrice}
            </p>
            <p className="text-gray-400 text-sm mb-4">
              One-time purchase
            </p>
            <button className="px-8 py-3 bg-[#ff6b9d] hover:bg-[#f06292] text-white font-semibold rounded-full transition-colors">
              Unlock Now
            </button>
          </div>
        )}
        
        <p className="text-gray-500 text-sm mt-4">
          or subscribe to see all content
        </p>
      </div>
      
      {/* Type Badge */}
      <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 rounded-full flex items-center gap-1">
        {item.type === 'video' ? (
          <>
            <Play size={12} className="text-white" />
            <span className="text-white text-xs font-medium">VIDEO</span>
          </>
        ) : (
          <>
            <Eye size={12} className="text-white" />
            <span className="text-white text-xs font-medium">PHOTO</span>
          </>
        )}
      </div>
    </div>
  )
}

function UnlockedContent({ item }: { item: ContentItem }) {
  return (
    <div className="relative aspect-[4/5] bg-[#1a1a1a]">
      <div className="w-full h-full bg-gradient-to-br from-[#ff6b9d]/20 to-[#e91e63]/20 flex items-center justify-center">
        <span className="text-gray-500">Content Placeholder</span>
      </div>
      
      {/* Type Badge */}
      <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 rounded-full flex items-center gap-1">
        {item.type === 'video' ? (
          <>
            <Play size={12} className="text-white" />
            <span className="text-white text-xs font-medium">VIDEO</span>
          </>
        ) : (
          <>
            <Eye size={12} className="text-white" />
            <span className="text-white text-xs font-medium">PHOTO</span>
          </>
        )}
      </div>
    </div>
  )
}
