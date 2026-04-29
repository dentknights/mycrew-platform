'use client'

import { Check, Star } from 'lucide-react'

interface Tier {
  id: string
  name: string
  price: number
  description: string
  benefits: string[]
  isPopular?: boolean
}

interface SubscriptionTiersProps {
  tiers: Tier[]
  creatorName: string
}

export function SubscriptionTiers({ tiers, creatorName }: SubscriptionTiersProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {tiers.map((tier) => (
        <div
          key={tier.id}
          className={`
            relative bg-[#121212] rounded-xl border-2 p-6 transition-all duration-300
            ${tier.isPopular 
              ? 'border-[#ff6b9d] scale-105 shadow-lg shadow-[#ff6b9d]/20' 
              : 'border-[#2d2d2d] hover:border-[#ff6b9d]/50'}
          `}
        >
          {/* Popular Badge */}
          {tier.isPopular && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#ff6b9d] text-white text-sm font-semibold rounded-full flex items-center gap-1">
              <Star size={14} className="fill-white" />
              Most Popular
            </div>
          )}

          {/* Tier Name */}
          <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
          
          {/* Price */}
          <div className="mb-4">
            <span className="text-4xl font-bold text-white">${tier.price}</span>
            <span className="text-gray-500">/month</span>
          </div>

          {/* Description */}
          <p className="text-gray-400 text-sm mb-6">{tier.description}</p>

          {/* Benefits */}
          <ul className="space-y-3 mb-6">
            {tier.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#ff6b9d]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check size={12} className="text-[#ff6b9d]" />
                </div>
                <span className="text-gray-300 text-sm">{benefit}</span>
              </li>
            ))}
          </ul>

          {/* Subscribe Button */}
          <button
            className={`
              w-full py-3 rounded-full font-semibold transition-all duration-200
              ${tier.isPopular
                ? 'bg-[#ff6b9d] hover:bg-[#f06292] text-white'
                : 'bg-[#1a1a1a] hover:bg-[#2d2d2d] text-white border border-[#2d2d2d]'}
            `}
          >
            Subscribe
          </button>

          {/* Trial Note */}
          <p className="text-center text-gray-500 text-xs mt-3">
            Cancel anytime
          </p>
        </div>
      ))}
    </div>
  )
}
