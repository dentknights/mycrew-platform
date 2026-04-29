'use client'

import { useState } from 'react'
import { X, Heart, DollarSign } from 'lucide-react'

interface TipModalProps {
  onClose: () => void
  onTip: (amount: number) => void
  creatorName: string
}

const presetAmounts = [5, 10, 25, 50, 100, 500]

export function TipModal({ onClose, onTip, creatorName }: TipModalProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(25)
  const [customAmount, setCustomAmount] = useState('')
  const [message, setMessage] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const handleTip = async () => {
    const amount = selectedAmount || parseFloat(customAmount) || 0
    if (amount <= 0) return

    setIsProcessing(true)
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1000))
    onTip(amount)
    setIsProcessing(false)
    onClose()
  }

  const finalAmount = selectedAmount || parseFloat(customAmount) || 0

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-[#121212] rounded-2xl max-w-md w-full border border-[#2d2d2d] overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-[#2d2d2d] flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">Send Tip</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Creator Info */}
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#ff6b9d] to-[#e91e63] flex items-center justify-center text-white font-bold text-2xl mx-auto mb-2">
              {creatorName[0]}
            </div>
            <p className="text-white font-semibold">{creatorName}</p>
            <p className="text-gray-500 text-sm">Show your appreciation!</p>
          </div>

          {/* Preset Amounts */}
          <div className="grid grid-cols-3 gap-3">
            {presetAmounts.map((amount) => (
              <button
                key={amount}
                onClick={() => {
                  setSelectedAmount(amount)
                  setCustomAmount('')
                }}
                className={`py-3 rounded-lg font-bold text-lg transition-colors ${
                  selectedAmount === amount
                    ? 'bg-[#ff6b9d] text-white'
                    : 'bg-[#1a1a1a] text-white hover:bg-[#2d2d2d]'
                }`}
              >
                ${amount}
              </button>
            ))}
          </div>

          {/* Custom Amount */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Custom Amount</label>
            <div className="relative">
              <DollarSign size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="number"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value)
                  setSelectedAmount(null)
                }}
                placeholder="Enter amount"
                className="w-full bg-[#1a1a1a] border border-[#2d2d2d] rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6b9d]"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Message (optional)</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Add a message..."
              rows={3}
              className="w-full bg-[#1a1a1a] border border-[#2d2d2d] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6b9d] resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#2d2d2d]">
          <button
            onClick={handleTip}
            disabled={isProcessing || finalAmount <= 0}
            className="w-full py-4 bg-[#ff6b9d] hover:bg-[#f06292] disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold text-lg rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Heart size={20} className="fill-white" />
                Send ${finalAmount.toFixed(2)} Tip
              </>
            )}
          </button>
          <p className="text-center text-gray-500 text-sm mt-3">
            Tips are non-refundable
          </p>
        </div>
      </div>
    </div>
  )
}
