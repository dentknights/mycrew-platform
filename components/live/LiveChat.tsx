'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Gift, Crown } from 'lucide-react'

interface ChatMessage {
  id: string
  user: {
    username: string
    displayName: string
    isSubscriber: boolean
    isModerator: boolean
  }
  message: string
  type: 'text' | 'tip' | 'gift' | 'system'
  amount?: number
  timestamp: Date
}

interface LiveChatProps {
  streamId: string
}

export function LiveChat({ streamId }: LiveChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      user: { username: 'fan1', displayName: 'SuperFan', isSubscriber: true, isModerator: false },
      message: 'You look amazing today! 🔥',
      type: 'text',
      timestamp: new Date(),
    },
    {
      id: '2',
      user: { username: 'fan2', displayName: 'JohnDoe', isSubscriber: false, isModerator: false },
      message: 'Hello from Texas!',
      type: 'text',
      timestamp: new Date(),
    },
    {
      id: '3',
      user: { username: 'fan3', displayName: 'BigTipper', isSubscriber: true, isModerator: false },
      message: 'sent $50',
      type: 'tip',
      amount: 50,
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = () => {
    if (!inputMessage.trim()) return
    
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      user: { username: 'me', displayName: 'You', isSubscriber: true, isModerator: false },
      message: inputMessage,
      type: 'text',
      timestamp: new Date(),
    }
    
    setMessages([...messages, newMessage])
    setInputMessage('')
  }

  return (
    <>
      {/* Chat Header */}
      <div className="p-4 border-b border-[#2d2d2d]">
        <h3 className="text-white font-semibold">Live Chat</h3>
        <p className="text-sm text-gray-500">{messages.length} messages</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className="animate-fade-in">
            {msg.type === 'tip' ? (
              <div className="bg-gradient-to-r from-[#ff6b9d]/20 to-[#e91e63]/20 rounded-lg p-3 border border-[#ff6b9d]/30">
                <div className="flex items-center gap-2 mb-1">
                  <Crown size={14} className="text-yellow-500" />
                  <span className="text-[#ff6b9d] font-bold">TIP</span>
                </div>
                <p className="text-white">
                  <span className="font-semibold">{msg.user.displayName}</span> sent{' '}
                  <span className="text-[#ff6b9d] font-bold">${msg.amount}</span>
                </p>
              </div>
            ) : (
              <div className="flex items-start gap-2">
                <span className="text-gray-500 text-sm shrink-0">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                <div>
                  <span 
                    className={`font-semibold text-sm ${
                      msg.user.isModerator 
                        ? 'text-green-500' 
                        : msg.user.isSubscriber 
                          ? 'text-[#ff6b9d]' 
                          : 'text-gray-400'
                    }`}
                  >
                    {msg.user.displayName}
                  </span>
                  <span className="text-white text-sm ml-1">{msg.message}</span>
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-[#2d2d2d]">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Say something..."
            className="flex-1 bg-[#1a1a1a] border border-[#2d2d2d] rounded-full px-4 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#ff6b9d]"
          />
          <button 
            onClick={sendMessage}
            className="p-2 bg-[#ff6b9d] hover:bg-[#f06292] text-white rounded-full transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
        <div className="flex items-center justify-center gap-4 mt-3">
          <button className="flex items-center gap-1 text-gray-400 hover:text-[#ff6b9d] text-sm">
            <Gift size={14} />
            <span>Gift</span>
          </button>
        </div>
      </div>
    </>
  )
}
