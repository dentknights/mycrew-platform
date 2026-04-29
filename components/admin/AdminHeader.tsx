'use client'

import { useState } from 'react'
import { Search, Bell, Menu, X } from 'lucide-react'

export function AdminHeader() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  return (
    <header className="h-16 bg-[#0a0a0a] border-b border-[#2d2d2d] flex items-center justify-between px-6">
      {/* Search */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Search users, creators, transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-[#2d2d2d] rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6b9d]"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4 ml-4">
        {/* Notifications */}
        <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden p-2 text-gray-400 hover:text-white"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  )
}
