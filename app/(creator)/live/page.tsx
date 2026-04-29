'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Video, Users, DollarSign, Settings, AlertCircle } from 'lucide-react'

export default function GoLivePage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [isNSFW, setIsNSFW] = useState(false)
  const [allowTips, setAllowTips] = useState(true)
  const [allowBattle, setAllowBattle] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const handleGoLive = async () => {
    setIsLoading(true)
    
    try {
      // Create stream via API
      const response = await fetch('/api/live/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          isNSFW,
          allowTips,
          allowBattle,
        }),
      })

      const data = await response.json()

      if (data.success) {
        router.push(`/live/${data.stream.id}`)
      } else {
        alert('Failed to create stream')
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Error creating stream:', error)
      alert('Failed to create stream')
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Go Live</h1>
        <p className="text-gray-400">Start a live stream and connect with your fans in real-time</p>
      </div>

      <div className="bg-[#121212] rounded-xl border border-[#2d2d2d] p-6 space-y-6">
        {/* Stream Title */}
        <div>
          <label className="block text-white font-medium mb-2">Stream Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What are you streaming about?"
            className="w-full bg-[#1a1a1a] border border-[#2d2d2d] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6b9d]"
          />
        </div>

        {/* Stream Settings */}
        <div className="space-y-4">
          <h3 className="text-white font-medium flex items-center gap-2">
            <Settings size={18} />
            Stream Settings
          </h3>

          {/* NSFW Toggle */}
          <label className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-lg cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                <AlertCircle size={20} className="text-red-500" />
              </div>
              <div>
                <p className="text-white font-medium">18+ Content</p>
                <p className="text-sm text-gray-500">Mark stream as adult content</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={isNSFW}
              onChange={(e) => setIsNSFW(e.target.checked)}
              className="w-5 h-5 accent-[#ff6b9d]"
            />
          </label>

          {/* Tips Toggle */}
          <label className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-lg cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#ff6b9d]/20 flex items-center justify-center">
                <DollarSign size={20} className="text-[#ff6b9d]" />
              </div>
              <div>
                <p className="text-white font-medium">Allow Tips</p>
                <p className="text-sm text-gray-500">Fans can send tips during stream</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={allowTips}
              onChange={(e) => setAllowTips(e.target.checked)}
              className="w-5 h-5 accent-[#ff6b9d]"
            />
          </label>

          {/* Battle Mode Toggle */}
          <label className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-lg cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Users size={20} className="text-purple-500" />
              </div>
              <div>
                <p className="text-white font-medium">Battle Mode</p>
                <p className="text-sm text-gray-500">Allow other creators to challenge you to a battle</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={allowBattle}
              onChange={(e) => setAllowBattle(e.target.checked)}
              className="w-5 h-5 accent-[#ff6b9d]"
            />
          </label>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#1a1a1a] rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Video size={18} className="text-[#ff6b9d]" />
              <span className="text-white font-medium">Stream Quality</span>
            </div>
            <p className="text-sm text-gray-500">Up to 1080p HD streaming with low latency</p>
          </div>
          <div className="bg-[#1a1a1a] rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users size={18} className="text-purple-500" />
              <span className="text-white font-medium">Battle Mode</span>
            </div>
            <p className="text-sm text-gray-500">Compete with other creators for tips and prizes</p>
          </div>
        </div>

        {/* Go Live Button */}
        <button
          onClick={handleGoLive}
          disabled={isLoading || !title}
          className="w-full py-4 bg-[#ff6b9d] hover:bg-[#f06292] disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold text-lg rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Starting Stream...
            </>
          ) : (
            <>
              <Video size={24} />
              Go Live Now
            </>
          )}
        </button>
      </div>

      {/* Recent Streams */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-white mb-4">Recent Streams</h2>
        <div className="space-y-3">
          {[
            { title: 'Q&A Session', date: '2 days ago', viewers: 1240, earnings: 89.50 },
            { title: 'Behind the Scenes', date: '5 days ago', viewers: 890, earnings: 156.00 },
            { title: 'Live Photoshoot', date: '1 week ago', viewers: 2100, earnings: 234.75 },
          ].map((stream, i) => (
            <div key={i} className="bg-[#121212] rounded-lg p-4 border border-[#2d2d2d] flex items-center justify-between">
              <div>
                <p className="text-white font-medium">{stream.title}</p>
                <p className="text-sm text-gray-500">{stream.date}</p>
              </div>
              <div className="text-right">
                <p className="text-white">{stream.viewers.toLocaleString()} viewers</p>
                <p className="text-[#ff6b9d] font-medium">${stream.earnings.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Battle Royale Notice */}
      <div className="mt-8 bg-gradient-to-r from-purple-900/30 to-[#ff6b9d]/20 rounded-xl p-6 border border-purple-500/30">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">🏆</span>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg mb-1">Battle Royale Coming Soon</h3>
            <p className="text-gray-400 text-sm mb-3">
              Large-scale creator battles with 4-16 participants competing for 30 minutes. 
              Fans tip to support their favorites. Winners get cash prizes and featured placement.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-purple-400">
                <strong>30 min</strong> battles
              </span>
              <span className="text-purple-400">
                <strong>$1,000+</strong> prizes
              </span>
              <span className="text-purple-400">
                <strong>4-16</strong> creators
              </span>
            </div>
            <p className="text-gray-500 text-xs mt-3">
              Rolling out when platform reaches 500+ active creators
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
