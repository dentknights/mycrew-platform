import { Metadata } from 'next'
import Link from 'next/link'
import { LiveStreamCard } from '@/components/live/LiveStreamCard'

export const metadata: Metadata = {
  title: 'Live Streams - MyCrew',
  description: 'Watch live streams from your favorite creators on MyCrew.',
}

// Mock data - would come from API
const liveStreams = [
  {
    id: 'stream1',
    title: 'Q&A Session - Ask Me Anything!',
    creator: {
      id: '1',
      username: 'jessicamodel',
      displayName: 'Jessica Model',
      avatar: '/avatars/jessica.jpg',
      isVerified: true,
    },
    thumbnail: '/thumbnails/stream1.jpg',
    viewerCount: 1247,
    startedAt: '10 minutes ago',
    isNSFW: false,
    category: 'Just Chatting',
  },
  {
    id: 'stream2',
    title: 'Live Workout - Full Body Routine',
    creator: {
      id: '2',
      username: 'fitnessguru',
      displayName: 'Fitness Guru Mike',
      avatar: '/avatars/mike.jpg',
      isVerified: true,
    },
    thumbnail: '/thumbnails/stream2.jpg',
    viewerCount: 3420,
    startedAt: '25 minutes ago',
    isNSFW: false,
    category: 'Fitness',
  },
  {
    id: 'stream3',
    title: 'Behind the Scenes Photoshoot',
    creator: {
      id: '3',
      username: 'artisticbabe',
      displayName: 'Artistic Babe',
      avatar: '/avatars/art.jpg',
      isVerified: true,
    },
    thumbnail: '/thumbnails/stream3.jpg',
    viewerCount: 890,
    startedAt: '5 minutes ago',
    isNSFW: true,
    category: 'Photography',
  },
  {
    id: 'stream4',
    title: 'Gaming Night - Playing Fortnite',
    creator: {
      id: '4',
      username: 'gamingqueen',
      displayName: 'Gaming Queen',
      avatar: '/avatars/gaming.jpg',
      isVerified: false,
    },
    thumbnail: '/thumbnails/stream4.jpg',
    viewerCount: 567,
    startedAt: '1 hour ago',
    isNSFW: false,
    category: 'Gaming',
  },
]

const categories = ['All', 'Just Chatting', 'Fitness', 'Gaming', 'Photography', 'Music', 'Art', 'NSFW']

export default function LiveDiscoveryPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Live Streams</h1>
        <p className="text-gray-400">Watch live content from your favorite creators</p>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
        {categories.map((category, index) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-colors ${
              index === 0
                ? 'bg-[#ff6b9d] text-white'
                : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#2d2d2d] hover:text-white'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Featured Battle Banner */}
      <div className="mb-8 bg-gradient-to-r from-purple-900/50 to-[#ff6b9d]/30 rounded-xl p-6 border border-purple-500/30">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-1 bg-purple-500 text-white text-xs font-bold rounded">LIVE BATTLE</span>
              <span className="text-purple-400 text-sm">Happening Now</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">Jessica vs Mike</h2>
            <p className="text-gray-400">Watch two creators battle for tips! Who will win?</p>
          </div>
          <Link
            href="/live/battle-featured"
            className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-lg transition-colors"
          >
            Watch Battle
          </Link>
        </div>
      </div>

      {/* Live Streams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {liveStreams.map((stream) => (
          <LiveStreamCard key={stream.id} stream={stream} />
        ))}
      </div>

      {/* Empty State */}
      {liveStreams.length === 0 && (
        <div className="text-center py-20">
          <div className="w-20 h-20 rounded-full bg-[#1a1a1a] flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No live streams</h3>
          <p className="text-gray-500">Check back later for live content</p>
        </div>
      )}
    </div>
  )
}
