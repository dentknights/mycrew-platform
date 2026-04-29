'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams } from 'next/navigation'
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  MoreHorizontal, 
  Send,
  Users,
  DollarSign,
  Trophy,
  Flame,
  X
} from 'lucide-react'
import { LiveChat } from '@/components/live/LiveChat'
import { LiveBattle } from '@/components/live/LiveBattle'
import { TipModal } from '@/components/live/TipModal'
import { BattleRequestModal } from '@/components/live/BattleRequestModal'

interface StreamData {
  id: string
  title: string
  creator: {
    id: string
    username: string
    displayName: string
    avatar: string
    isVerified: boolean
  }
  viewerCount: number
  likeCount: number
  isLive: boolean
  startedAt: string
  allowBattle: boolean
}

interface BattleState {
  isActive: boolean
  opponent: {
    id: string
    displayName: string
    avatar: string
    score: number
  } | null
  myScore: number
  timeRemaining: number
}

export default function LiveStreamPage() {
  const params = useParams()
  const streamId = params.id as string
  const videoRef = useRef<HTMLVideoElement>(null)
  
  const [stream, setStream] = useState<StreamData>({
    id: streamId,
    title: 'Live Stream',
    creator: {
      id: '1',
      username: 'jessicamodel',
      displayName: 'Jessica Model',
      avatar: '/avatars/jessica.jpg',
      isVerified: true,
    },
    viewerCount: 1247,
    likeCount: 3420,
    isLive: true,
    startedAt: new Date().toISOString(),
    allowBattle: true,
  })
  
  const [showChat, setShowChat] = useState(true)
  const [showTipModal, setShowTipModal] = useState(false)
  const [showBattleModal, setShowBattleModal] = useState(false)
  const [battleState, setBattleState] = useState<BattleState>({
    isActive: false,
    opponent: null,
    myScore: 0,
    timeRemaining: 0,
  })
  const [isLiked, setIsLiked] = useState(false)

  // Simulate battle starting
  const startBattle = () => {
    setBattleState({
      isActive: true,
      opponent: {
        id: '2',
        displayName: 'Fitness Guru Mike',
        avatar: '/avatars/mike.jpg',
        score: 0,
      },
      myScore: 0,
      timeRemaining: 300, // 5 minutes
    })
    setShowBattleModal(false)
  }

  // Simulate receiving tips (for demo)
  const simulateTip = (amount: number) => {
    if (battleState.isActive) {
      setBattleState(prev => ({
        ...prev,
        myScore: prev.myScore + amount,
      }))
    }
    setStream(prev => ({
      ...prev,
      likeCount: prev.likeCount + 1,
    }))
  }

  return (
    <div className="fixed inset-0 bg-black flex">
      {/* Main Video Area */}
      <div className="flex-1 relative">
        {/* Video Player */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b9d]/20 to-[#e91e63]/20 flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 rounded-full bg-[#ff6b9d] flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Users size={48} className="text-white" />
            </div>
            <p className="text-white text-xl font-semibold">Live Stream Active</p>
            <p className="text-gray-400">Stream ID: {streamId}</p>
          </div>
        </div>

        {/* Battle Overlay */}
        {battleState.isActive && (
          <LiveBattle 
            battleState={battleState} 
            onClose={() => setBattleState(prev => ({ ...prev, isActive: false }))}
          />
        )}

        {/* Top Overlay */}
        <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex items-center justify-between">
            {/* Creator Info */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ff6b9d] to-[#e91e63] flex items-center justify-center text-white font-bold text-lg">
                  {stream.creator.displayName[0]}
                </div>
                <div className="absolute -bottom-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
                  LIVE
                </div>
              </div>
              <div>
                <p className="text-white font-semibold flex items-center gap-1">
                  {stream.creator.displayName}
                  {stream.creator.isVerified && (
                    <span className="text-[#ff6b9d]">✓</span>
                  )}
                </p>
                <p className="text-gray-400 text-sm">{stream.title}</p>
              </div>
              <button className="ml-4 px-4 py-1.5 bg-[#ff6b9d] text-white text-sm font-medium rounded-full">
                Follow
              </button>
            </div>

            {/* Top Actions */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-black/50 px-3 py-1.5 rounded-full">
                <Users size={16} className="text-white" />
                <span className="text-white text-sm font-medium">
                  {stream.viewerCount.toLocaleString()}
                </span>
              </div>
              <button 
                onClick={() => setShowBattleModal(true)}
                disabled={!stream.allowBattle || battleState.isActive}
                className="flex items-center gap-1 bg-purple-500/80 hover:bg-purple-500 disabled:bg-gray-700 disabled:cursor-not-allowed px-3 py-1.5 rounded-full transition-colors"
              >
                <Trophy size={16} className="text-white" />
                <span className="text-white text-sm font-medium">
                  {battleState.isActive ? 'Battling' : 'Battle'}
                </span>
              </button>
              <button className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70">
                <X size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex items-center justify-between">
            {/* Left Actions */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => {
                  setIsLiked(!isLiked)
                  simulateTip(1)
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                  isLiked ? 'bg-red-500 text-white' : 'bg-black/50 text-white hover:bg-black/70'
                }`}
              >
                <Heart size={20} className={isLiked ? 'fill-white' : ''} />
                <span className="font-medium">{stream.likeCount.toLocaleString()}</span>
              </button>
              <button 
                onClick={() => setShowChat(!showChat)}
                className="flex items-center gap-2 px-4 py-2 bg-black/50 text-white rounded-full hover:bg-black/70"
              >
                <MessageCircle size={20} />
                <span className="font-medium">Chat</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-black/50 text-white rounded-full hover:bg-black/70">
                <Share2 size={20} />
                <span className="font-medium">Share</span>
              </button>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowTipModal(true)}
                className="flex items-center gap-2 px-6 py-3 bg-[#ff6b9d] hover:bg-[#f06292] text-white font-bold rounded-full transition-colors"
              >
                <DollarSign size={20} />
                <span>Send Tip</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Sidebar */}
      {showChat && (
        <div className="w-80 bg-[#121212] border-l border-[#2d2d2d] flex flex-col">
          <LiveChat streamId={streamId} />
        </div>
      )}

      {/* Modals */}
      {showTipModal && (
        <TipModal 
          onClose={() => setShowTipModal(false)} 
          onTip={simulateTip}
          creatorName={stream.creator.displayName}
        />
      )}
      
      {showBattleModal && (
        <BattleRequestModal 
          onClose={() => setShowBattleModal(false)}
          onStartBattle={startBattle}
        />
      )}
    </div>
  )
}
