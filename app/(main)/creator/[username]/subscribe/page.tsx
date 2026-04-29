import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SubscriptionTiers } from '@/components/subscription/SubscriptionTiers'
import { CreatorProfileHeader } from '@/components/creator/CreatorProfileHeader'

interface SubscribePageProps {
  params: {
    username: string
  }
}

// Mock data - would come from API
const creatorData = {
  id: '1',
  username: 'jessicamodel',
  displayName: 'Jessica Model',
  avatar: '/avatars/jessica.jpg',
  bannerImage: '/banners/jessica.jpg',
  bio: 'Fashion model & lifestyle creator 🎈 Exclusive content you won\'t find anywhere else!',
  isNSFW: false,
  isVerified: true,
  followerCount: 45200,
  subscriptionCount: 3200,
  postCount: 342,
  mediaCount: 892,
  tiers: [
    {
      id: 'tier1',
      name: 'Basic',
      price: 9.99,
      description: 'Get access to my exclusive content',
      benefits: [
        'Access to all posts',
        'Direct messaging',
        'Cancel anytime',
      ],
      isPopular: false,
    },
    {
      id: 'tier2',
      name: 'Premium',
      price: 24.99,
      description: 'Everything in Basic + more perks',
      benefits: [
        'Everything in Basic',
        'Weekly exclusive videos',
        'Priority messaging',
        'Behind the scenes content',
      ],
      isPopular: true,
    },
    {
      id: 'tier3',
      name: 'VIP',
      price: 49.99,
      description: 'The ultimate experience',
      benefits: [
        'Everything in Premium',
        'Monthly 1-on-1 video call',
        'Custom content requests',
        'Early access to all content',
        'Personal shoutouts',
      ],
      isPopular: false,
    },
  ],
}

export async function generateMetadata({ params }: SubscribePageProps): Promise<Metadata> {
  return {
    title: `Subscribe to ${creatorData.displayName} - MyCrew`,
    description: `Subscribe to ${creatorData.displayName} on MyCrew for exclusive content.`,
  }
}

export default function SubscribePage({ params }: SubscribePageProps) {
  // In real app, fetch creator data based on params.username
  if (params.username !== creatorData.username) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Creator Header */}
      <CreatorProfileHeader creator={creatorData} />

      {/* Subscribe Section */}
      <div className="mt-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Subscribe to {creatorData.displayName}
          </h1>
          <p className="text-gray-400">
            Choose a subscription tier that works for you
          </p>
        </div>

        {/* Subscription Tiers */}
        <SubscriptionTiers tiers={creatorData.tiers} creatorName={creatorData.displayName} />

        {/* Platform Benefits */}
        <div className="mt-12 bg-[#121212] rounded-xl p-6 border border-[#2d2d2d]">
          <h2 className="text-xl font-semibold text-white mb-4">
            Why subscribe on MyCrew?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#ff6b9d]/20 flex items-center justify-center flex-shrink-0">
                <span className="text-[#ff6b9d] text-lg">🔒</span>
              </div>
              <div>
                <h3 className="text-white font-medium mb-1">Secure Content</h3>
                <p className="text-sm text-gray-400">
                  Anti-screenshot protection keeps content safe
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#ff6b9d]/20 flex items-center justify-center flex-shrink-0">
                <span className="text-[#ff6b9d] text-lg">💬</span>
              </div>
              <div>
                <h3 className="text-white font-medium mb-1">Direct Access</h3>
                <p className="text-sm text-gray-400">
                  Message creators directly
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#ff6b9d]/20 flex items-center justify-center flex-shrink-0">
                <span className="text-[#ff6b9d] text-lg">✨</span>
              </div>
              <div>
                <h3 className="text-white font-medium mb-1">Exclusive Content</h3>
                <p className="text-sm text-gray-400">
                  Content you won&apos;t find anywhere else
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cancellation Notice */}
        <p className="text-center text-gray-500 text-sm mt-6">
          You can cancel your subscription at any time. No refunds for partial months.
        </p>
      </div>
    </div>
  )
}
