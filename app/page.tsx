import { Metadata } from 'next'
import { CreatorCard } from '@/components/creator/CreatorCard'
import { ContentFeed } from '@/components/content/ContentFeed'
import { TrendingCreators } from '@/components/creator/TrendingCreators'

export const metadata: Metadata = {
  title: 'MyCrew - Home',
  description: 'Discover amazing creators and exclusive content on MyCrew.',
}

// Mock data - would come from API
const featuredCreators = [
  {
    id: '1',
    username: 'jessicamodel',
    displayName: 'Jessica Model',
    avatar: '/avatars/jessica.jpg',
    bannerImage: '/banners/jessica.jpg',
    bio: 'Fashion model & lifestyle creator 🌸',
    isNSFW: false,
    isVerified: true,
    followerCount: 45200,
    subscriptionCount: 3200,
    lowestTierPrice: 9.99,
    previewImages: ['/preview1.jpg', '/preview2.jpg', '/preview3.jpg'],
  },
  {
    id: '2',
    username: 'fitnessguru',
    displayName: 'Fitness Guru Mike',
    avatar: '/avatars/mike.jpg',
    bannerImage: '/banners/mike.jpg',
    bio: 'Personal trainer | Workout plans 💪',
    isNSFW: false,
    isVerified: true,
    followerCount: 89100,
    subscriptionCount: 5600,
    lowestTierPrice: 14.99,
    previewImages: ['/preview4.jpg', '/preview5.jpg', '/preview6.jpg'],
  },
  {
    id: '3',
    username: 'artisticbabe',
    displayName: 'Artistic Babe',
    avatar: '/avatars/art.jpg',
    bannerImage: '/banners/art.jpg',
    bio: 'Artist & dreamer 🎨 Exclusive content',
    isNSFW: true,
    isVerified: true,
    followerCount: 125000,
    subscriptionCount: 8900,
    lowestTierPrice: 12.99,
    previewImages: ['/preview7.jpg', '/preview8.jpg', '/preview9.jpg'],
  },
]

const feedContent = [
  {
    id: '1',
    creator: featuredCreators[0],
    type: 'image' as const,
    thumbnail: '/content/post1.jpg',
    isLocked: false,
    likes: 1234,
    comments: 89,
    caption: 'New photoshoot! What do you think? 💕',
    createdAt: '2 hours ago',
  },
  {
    id: '2',
    creator: featuredCreators[1],
    type: 'video' as const,
    thumbnail: '/content/post2.jpg',
    isLocked: true,
    ppvPrice: 5.99,
    likes: 567,
    comments: 45,
    caption: 'Full workout routine - exclusive! 🔥',
    createdAt: '4 hours ago',
  },
  {
    id: '3',
    creator: featuredCreators[2],
    type: 'image' as const,
    thumbnail: '/content/post3.jpg',
    isLocked: true,
    ppvPrice: 9.99,
    likes: 2341,
    comments: 156,
    caption: 'Behind the scenes from today 🎨✨',
    createdAt: '6 hours ago',
  },
]

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome to MyCrew
        </h1>
        <p className="text-gray-400">
          Discover creators, unlock exclusive content, and support your favorites.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-6">
          {/* Create Post Card (if creator) */}
          <div className="bg-[#121212] rounded-xl p-4 border border-[#2d2d2d]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff6b9d] to-[#e91e63] flex items-center justify-center">
                <span className="text-white font-semibold">Y</span>
              </div>
              <input
                type="text"
                placeholder="What's on your mind?"
                className="flex-1 bg-[#1a1a1a] border border-[#2d2d2d] rounded-full px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6b9d]"
              />
            </div>
            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-[#2d2d2d]">
              <button className="flex items-center gap-2 text-gray-400 hover:text-[#ff6b9d] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm">Photo</span>
              </button>
              <button className="flex items-center gap-2 text-gray-400 hover:text-[#ff6b9d] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span className="text-sm">Video</span>
              </button>
              <button className="flex items-center gap-2 text-gray-400 hover:text-[#ff6b9d] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm">PPV</span>
              </button>
            </div>
          </div>

          {/* Content Feed */}
          <ContentFeed content={feedContent} />
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Trending Creators */}
          <div className="bg-[#121212] rounded-xl p-4 border border-[#2d2d2d]">
            <h2 className="text-lg font-semibold text-white mb-4">Trending Now</h2>
            <TrendingCreators creators={featuredCreators.slice(0, 5)} />
          </div>

          {/* Featured Creators */}
          <div className="bg-[#121212] rounded-xl p-4 border border-[#2d2d2d]">
            <h2 className="text-lg font-semibold text-white mb-4">Featured Creators</h2>
            <div className="space-y-4">
              {featuredCreators.map((creator) => (
                <CreatorCard key={creator.id} creator={creator} compact />
              ))}
            </div>
          </div>

          {/* Platform Stats */}
          <div className="bg-gradient-to-br from-[#ff6b9d]/20 to-[#e91e63]/20 rounded-xl p-4 border border-[#ff6b9d]/30">
            <h3 className="text-white font-semibold mb-2">Why MyCrew?</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <span className="text-[#ff6b9d]">✓</span>
                Only 10% platform fee
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#ff6b9d]">✓</span>
                90-day free trial
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#ff6b9d]">✓</span>
                Anti-screenshot protection
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#ff6b9d]">✓</span>
                7 revenue streams
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
