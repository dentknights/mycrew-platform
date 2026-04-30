'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Plus, Wallet, Bell } from 'lucide-react'
import { useSession } from 'next-auth/react'

export function Header() {
  const { data: session } = useSession()
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <header className="fixed top-0 right-0 left-0 md:left-[240px] h-16 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-[#1f1f1f] z-30">
      <div className="flex items-center justify-between h-full px-4 md:px-6">
        {/* Search Bar */}
        <div className="flex-1 max-w-xl ml-12 md:ml-0">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6b7280]" size={18} />
            <input
              type="text"
              placeholder="Search creators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-[#161616] border border-[#262626] rounded-lg text-white placeholder-[#6b7280] focus:outline-none focus:border-[#0095f6] transition-all text-sm"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {session?.user ? (
            <>
              <button className="hidden sm:flex items-center justify-center w-10 h-10 text-[#9ca3af] hover:text-white hover:bg-[#1c1c1c] rounded-lg transition-all">
                <Bell size={20} />
              </button>
              <Link
                href="/content/new"
                className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-[#0095f6] hover:bg-[#1877f2] text-white rounded-lg font-semibold transition-all text-sm"
              >
                <Plus size={18} />
                <span>Create</span>
              </Link>
            </>
          ) : null}

          <button className="flex items-center gap-2 px-3 py-2 bg-[#161616] hover:bg-[#1c1c1c] text-white rounded-lg font-medium transition-all border border-[#262626] text-sm">
            <Wallet size={18} className="text-[#00d4aa]" />
            <span className="hidden sm:inline font-semibold">$0.00</span>
          </button>

          {!session && (
            <div className="flex items-center gap-1">
              <Link
                href="/login"
                className="px-4 py-2.5 text-[#9ca3af] hover:text-white font-medium transition-colors text-sm"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="px-4 py-2.5 bg-[#0095f6] hover:bg-[#1877f2] text-white rounded-lg font-semibold transition-all text-sm"
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
