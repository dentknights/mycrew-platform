'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Compass, Heart, MessageSquare, User, Settings, Crown } from 'lucide-react'

const navItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: Compass, label: 'Explore', href: '/explore' },
  { icon: Heart, label: 'Subscriptions', href: '/subscriptions' },
  { icon: MessageSquare, label: 'Messages', href: '/messages' },
]

const creatorItems = [
  { icon: User, label: 'My Profile', href: '/profile' },
  { icon: Crown, label: 'Creator Dashboard', href: '/creator/dashboard' },
]

const bottomItems = [
  { icon: Settings, label: 'Settings', href: '/settings' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[240px] bg-[#0a0a0a] border-r border-[#1f1f1f] z-40 hidden md:flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-[#1f1f1f]">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#0095f6] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <span className="text-white font-bold text-lg tracking-tight">MyCrew</span>
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 py-4 px-3">
        <div className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${
                  isActive
                    ? 'bg-[#1c1c1c] text-white'
                    : 'text-[#9ca3af] hover:text-white hover:bg-[#161616]'
                }`}
              >
                <Icon size={20} className={isActive ? 'text-[#0095f6]' : ''} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </div>

        {/* Creator Section */}
        <div className="mt-6 pt-6 border-t border-[#1f1f1f]">
          <p className="px-3 mb-2 text-xs font-semibold text-[#6b7280] uppercase tracking-wider">
            Creator
          </p>
          <div className="space-y-1">
            {creatorItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${
                    isActive
                      ? 'bg-[#1c1c1c] text-white'
                      : 'text-[#9ca3af] hover:text-white hover:bg-[#161616]'
                  }`}
                >
                  <Icon size={20} className={isActive ? 'text-[#0095f6]' : ''} />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="py-4 px-3 border-t border-[#1f1f1f]">
        {bottomItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#9ca3af] hover:text-white hover:bg-[#161616] transition-all text-sm font-medium"
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </aside>
  )
}
