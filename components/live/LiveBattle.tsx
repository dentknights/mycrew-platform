'use client'

import { useEffect, useState } from 'react'
import { Trophy, Timer, Zap, Crown, X } from 'lucide-react'

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

interface LiveBattleProps {
  battleState: BattleState
  onClose: () => void
}

export function LiveBattle({ battleState, onClose }: LiveBattleProps) {
  const [timeLeft, setTimeLeft] = useState(battleState.timeRemaining)
  const [myScore, setMyScore] = useState(battleState.myScore)
  const [opponentScore, setOpponentScore] = useState(battleState.opponent?.score || 0)
  const [winner, setWinner] = useState<'me' | 'opponent' | 'tie' | null>(null)

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) {
      // Determine winner
      if (myScore > opponentScore) setWinner('me')
      else if (opponentScore > myScore) setWinner('opponent')
      else setWinner('tie')
      return
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1)
      
      // Simulate opponent getting tips
      if (Math.random() > 0.7) {
        setOpponentScore(prev => prev + Math.floor(Math.random() * 20) + 5)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, myScore, opponentScore])

  // Update my score from props
  useEffect(() => {
    setMyScore(battleState.myScore)
  }, [battleState.myScore])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const totalScore = myScore + opponentScore
  const myPercentage = totalScore > 0 ? (myScore / totalScore) * 100 : 50
  const opponentPercentage = totalScore > 0 ? (opponentScore / totalScore) * 100 : 50

  if (winner) {
    return (
      <div className="absolute inset-0 bg-black/90 flex items-center justify-center z-50">
        <div className="text-center p-8">
          <Trophy size={80} className={`mx-auto mb-4 ${
            winner === 'me' ? 'text-yellow-500' : 
            winner === 'opponent' ? 'text-gray-500' : 'text-[#ff6b9d]'
          }`} />
          <h2 className="text-4xl font-bold text-white mb-2">
            {winner === 'me' ? 'You Won!' : 
             winner === 'opponent' ? 'You Lost!' : 'It\'s a Tie!'}
          </h2>
          <p className="text-gray-400 mb-6">
            Final Score: ${myScore} vs ${opponentScore}
          </p>
          <button 
            onClick={onClose}
            className="px-8 py-3 bg-[#ff6b9d] hover:bg-[#f06292] text-white font-bold rounded-full"
          >
            Close
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="absolute inset-x-0 top-16 z-40 px-4">
      <div className="max-w-2xl mx-auto bg-[#121212]/95 backdrop-blur-md rounded-2xl border border-purple-500/50 p-4 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Trophy size={20} className="text-purple-500" />
            <span className="text-white font-bold">LIVE BATTLE</span>
          </div>
          <div className="flex items-center gap-2 bg-purple-500/20 px-3 py-1 rounded-full">
            <Timer size={16} className="text-purple-400" />
            <span className="text-purple-400 font-bold">{formatTime(timeLeft)}</span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Battle Arena */}
        <div className="flex items-center justify-between gap-4">
          {/* Me */}
          <div className="flex-1 text-center">
            <div className="relative inline-block">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#ff6b9d] to-[#e91e63] flex items-center justify-center text-white font-bold text-xl">
                ME
              </div>
              <div className="absolute -bottom-1 -right-1 bg-[#ff6b9d] text-white text-xs px-2 py-0.5 rounded-full font-bold">
                HOST
              </div>
            </div>
            <p className="text-white font-semibold mt-2">You</p>
            <p className="text-2xl font-bold text-[#ff6b9d]">${myScore}</p>
          </div>

          {/* VS */}
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">VS</span>
            </div>
          </div>

          {/* Opponent */}
          <div className="flex-1 text-center">
            <div className="relative inline-block">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white font-bold text-xl">
                {battleState.opponent?.displayName[0] || '?'}
              </div>
            </div>
            <p className="text-white font-semibold mt-2">
              {battleState.opponent?.displayName || 'Opponent'}
            </p>
            <p className="text-2xl font-bold text-purple-400">${opponentScore}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm text-gray-400 mb-1">
            <span>{myPercentage.toFixed(0)}%</span>
            <span>{opponentPercentage.toFixed(0)}%</span>
          </div>
          <div className="h-4 bg-[#1a1a1a] rounded-full overflow-hidden flex">
            <div 
              className="h-full bg-gradient-to-r from-[#ff6b9d] to-[#e91e63] transition-all duration-500"
              style={{ width: `${myPercentage}%` }}
            />
            <div 
              className="h-full bg-gradient-to-r from-purple-600 to-purple-800 transition-all duration-500"
              style={{ width: `${opponentPercentage}%` }}
            />
          </div>
        </div>

        {/* Leader Indicator */}
        <div className="mt-3 text-center">
          {myScore > opponentScore ? (
            <span className="text-[#ff6b9d] font-bold flex items-center justify-center gap-1">
              <Crown size={16} />
              You\'re in the lead!
            </span>
          ) : opponentScore > myScore ? (
            <span className="text-purple-400 font-bold">
              Opponent is in the lead
            </span>
          ) : (
            <span className="text-gray-400">It\'s a tie!</span>
          )}
        </div>

        {/* Tip Boosters */}
        <div className="mt-4 grid grid-cols-4 gap-2">
          {[5, 10, 25, 50].map((amount) => (
            <button
              key={amount}
              className="py-2 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white font-bold rounded-lg transition-all text-sm"
            >
              <Zap size={14} className="inline mr-1" />
              ${amount}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
