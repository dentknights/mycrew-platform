'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Plus, Wallet } from 'lucide-react'
import { useSession } from 'next-auth/react'

export function Header() {
  const { data: session } = useSession()
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <header className="fixed top-0 right-0 left-0 md:left-[240px] h-16 bg-black/95 backdrop-blur-md border-b border-[#2d2d2d] z-30">
      <div className="flex items-center justify-between h-full px-4 md:px-6">
        {/* Search Bar */}
        <div className="flex-1 max-w-xl ml-12 md:ml-0">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search creators, content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 bg-[#1a1a1a] border border-[#2d2d2d] rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6b9d] transition-colors"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {session?.user?.isCreator ? (
            <Link
              href="/content/new"
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#ff6b9d] hover:bg-[#f06292] text-white rounded-full font-medium transition-colors"
            >
              <Plus size={18} />
              <span>Create</span>
            </Link>
          ) : null}

          <button className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] hover:bg-[#2d2d2d] text-white rounded-full font-medium transition-colors border border-[#2d2d2d]">
            <Wallet size={18} />
            <span className="hidden sm:inline">$0.00</span>
          </button>

          {!session && (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-4 py-2 text-gray-400 hover:text-white font-medium transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 bg-[#ff6b9d] hover:bg-[#f06292] text-white rounded-full font-medium transition-colors"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
