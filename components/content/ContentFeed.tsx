'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, MessageCircle, Share2, Lock, Bookmark, MoreHorizontal, Play } from 'lucide-react'

interface Creator {
  id: string
  username: string
  displayName: string
  avatar: string
  isVerified: boolean
}

interface ContentItem {
  id: string
  creator: Creator
  type: 'image' | 'video'
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
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set())
  const [savedPosts, setSavedPosts] = useState<Set<string>>(new Set())

  const toggleLike = (postId: string) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
      } else {
        newSet.add(postId)
      }
      return newSet
    })
  }

  const toggleSave = (postId: string) => {
    setSavedPosts(prev => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
      } else {
        newSet.add(postId)
      }
      return newSet
    })
  }

  return (
    <div className="space-y-4">
      {content.map((item) => (
        <ContentCard
          key={item.id}
          item={item}
          isLiked={likedPosts.has(item.id)}
          isSaved={savedPosts.has(item.id)}
          onLike={() => toggleLike(item.id)}
          onSave={() => toggleSave(item.id)}
        />
      ))}
    </div>
  )
}

function ContentCard({
  item,
  isLiked,
  isSaved,
  onLike,
  onSave,
}: {
  item: ContentItem
  isLiked: boolean
  isSaved: boolean
  onLike: () => void
  onSave: () => void
}) {
  return (
    <article className="bg-[#111111] rounded-xl border border-[#1f1f1f] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <Link href={`/creator/${item.creator.username}`} className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1c1c1c] to-[#262626] flex items-center justify-center text-white font-semibold">
            {item.creator.displayName[0]}
          </div>
          <div>
            <p className="text-white font-medium text-sm group-hover:text-[#0095f6] transition-colors">
              {item.creator.displayName}
            </p>
            <p className="text-[#6b7280] text-xs">@{item.creator.username} • {item.createdAt}</p>
          </div>
        </Link>
        <button className="p-2 text-[#6b7280] hover:text-white hover:bg-[#1c1c1c] rounded-lg transition-all">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="relative aspect-[4/5] bg-[#0a0a0a]">
        {/* Placeholder for actual content */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#161616] to-[#1c1c1c] flex items-center justify-center">
          {item.type === 'video' && !item.isLocked && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-16 h-16 rounded-full bg-[#0095f6]/90 flex items-center justify-center backdrop-blur-sm">
                <Play size={28} className="text-white ml-1" fill="white" />
              </div>
            </div>
          )}
          
          {item.isLocked ? (
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#1c1c1c] flex items-center justify-center mx-auto mb-3">
                <Lock size={28} className="text-[#6b7280]" />
              </div>
              <p className="text-[#9ca3af] text-sm">Unlock for ${item.ppvPrice}</p>
            </div>
          ) : (
            <span className="text-[#4b5563] text-sm">Content Preview</span>
          )}
        </div>

        {/* Locked Overlay */}
        {item.isLocked && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-[#0095f6]/20 border border-[#0095f6]/30 flex items-center justify-center mx-auto mb-4">
                <Lock size={32} className="text-[#0095f6]" />
              </div>
              <p className="text-white font-semibold mb-2">Premium Content</p>
              <p className="text-[#9ca3af] text-sm mb-4">Unlock for ${item.ppvPrice}</p>
              <button className="px-6 py-2.5 bg-[#0095f6] hover:bg-[#1877f2] text-white rounded-lg font-semibold transition-all text-sm">
                Unlock Now
              </button>
            </div>
          </div>
        )}

        {/* NSFW Badge */}
        <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-[10px] font-bold text-white uppercase tracking-wider">
          {item.type}
        </div>
      </div>

      {/* Actions */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <button
              onClick={onLike}
              className={`flex items-center gap-2 transition-all ${
                isLiked ? 'text-[#ff3b30]' : 'text-white hover:text-[#ff3b30]'
              }`}
            >
              <Heart size={24} fill={isLiked ? '#ff3b30' : 'none'} />
              <span className="text-sm font-medium">{item.likes + (isLiked ? 1 : 0)}</span>
            </button>
            <button className="flex items-center gap-2 text-white hover:text-[#0095f6] transition-all">
              <MessageCircle size={24} />
              <span className="text-sm font-medium">{item.comments}</span>
            </button>
            <button className="text-white hover:text-[#0095f6] transition-all">
              <Share2 size={24} />
            </button>
          </div>
          <button
            onClick={onSave}
            className={`transition-all ${
              isSaved ? 'text-[#f5c518]' : 'text-white hover:text-[#f5c518]'
            }`}
          >
            <Bookmark size={24} fill={isSaved ? '#f5c518' : 'none'} />
          </button>
        </div>

        {/* Caption */}
        <p className="text-white text-sm">
          <Link href={`/creator/${item.creator.username}`} className="font-semibold hover:underline">
            {item.creator.displayName}
          </Link>{' '}
          <span className="text-[#9ca3af]">{item.caption}</span>
        </p>
      </div>
    </article>
  )
}
