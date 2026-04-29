'use client'

import { useState } from 'react'
import { X, Trophy, Users, Search } from 'lucide-react'

interface BattleRequestModalProps {
  onClose: () => void
  onStartBattle: () => void
}

const onlineCreators = [
  { id: '1', displayName: 'Fitness Guru Mike', avatar: '/avatars/mike.jpg', followers: '89K', isLive: true },
  { id: '2', displayName: 'Artistic Babe', avatar: '/avatars/art.jpg', followers: '125K', isLive: true },
  { id: '3', displayName: 'Gaming Queen', avatar: '/avatars/gaming.jpg', followers: '45K', isLive: true },
  { id: '4', displayName: 'Cooking With Sarah', avatar: '/avatars/sarah.jpg', followers: '67K', isLive: false },
]

export function BattleRequestModal({ onClose, onStartBattle }: BattleRequestModalProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCreator, setSelectedCreator] = useState<string | null>(null)
  const [battleDuration, setBattleDuration] = useState(5) // minutes

  const filteredCreators = onlineCreators.filter(c => 
    c.displayName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-[#121212] rounded-2xl max-w-lg w-full border border-[#2d2d2d] overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-[#2d2d2d] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy size={24} className="text-purple-500" />
            <h3 className="text-xl font-bold text-white">Start a Battle</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Info */}
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
            <p className="text-purple-400 text-sm">
              <strong className="text-white">How it works:</strong> Challenge another creator to a 
              5-minute battle. Fans tip to support their favorite. The creator with the most tips wins!
            </p>
          </div>

          {/* Duration Selection */}
          <div>
            <label className="block text-white font-medium mb-3">Battle Duration</label>
            <div className="flex gap-3">
              {[3, 5, 10].map((mins) => (
                <button
                  key={mins}
                  onClick={() => setBattleDuration(mins)}
                  className={`flex-1 py-3 rounded-lg font-bold transition-colors ${
                    battleDuration === mins
                      ? 'bg-purple-500 text-white'
                      : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#2d2d2d]'
                  }`}
                >
                  {mins} min
                </button>
              ))}
            </div>
          </div>

          {/* Search */}
          <div>
            <label className="block text-white font-medium mb-3">Choose Opponent</label>
            <div className="relative mb-4">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search creators..."
                className="w-full bg-[#1a1a1a] border border-[#2d2d2d] rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Creator List */}
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {filteredCreators.map((creator) => (
                <button
                  key={creator.id}
                  onClick={() => setSelectedCreator(creator.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    selectedCreator === creator.id
                      ? 'bg-purple-500/20 border border-purple-500/50'
                      : 'bg-[#1a1a1a] hover:bg-[#2d2d2d]'
                  }`}
                >
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white font-bold">
                      {creator.displayName[0]}
                    </div>
                    {creator.isLive && (
                      <div className="absolute -bottom-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
                        LIVE
                      </div>
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-white font-medium">{creator.displayName}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Users size={14} />
                      <span>{creator.followers} followers</span>
                    </div>
                  </div>
                  {selectedCreator === creator.id && (
                    <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#2d2d2d]">
          <button
            onClick={onStartBattle}
            disabled={!selectedCreator}
            className="w-full py-4 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold text-lg rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Trophy size={20} />
            Start Battle
          </button>
          <p className="text-center text-gray-500 text-sm mt-3">
            Battles are public and visible to all viewers
          </p>
        </div>
      </div>
    </div>
  )
}
