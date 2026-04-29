'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import {
  Home,
  Compass,
  MessageSquare,
  Bell,
  User,
  Settings,
  LayoutDashboard,
  Image as ImageIcon,
  Users,
  DollarSign,
  Video,
  Menu,
  X
} from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: Compass, label: 'Explore', href: '/explore' },
  { icon: MessageSquare, label: 'Messages', href: '/messages' },
  { icon: Bell, label: 'Notifications', href: '/notifications' },
  { icon: User, label: 'My Profile', href: '/profile' },
]

const creatorItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: ImageIcon, label: 'Content', href: '/content' },
  { icon: Users, label: 'Subscribers', href: '/subscribers' },
  { icon: DollarSign, label: 'Earnings', href: '/earnings' },
  { icon: Video, label: 'Go Live', href: '/live' },
]

export function Sidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [mobileOpen, setMobileOpen] = useState(false)
  const isCreator = session?.user?.isCreator

  const NavItem = ({ icon: Icon, label, href }: { icon: any, label: string, href: string }) => {
    const isActive = pathname === href
    return (
      <Link
        href={href}
        className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 ${
          isActive 
            ? 'bg-[#ff6b9d] text-white' 
            : 'text-gray-400 hover:bg-[#1a1a1a] hover:text-white'
        }`}
        onClick={() => setMobileOpen(false)}
      >
        <Icon size={22} />
        <span className="font-medium">{label}</span>
      </Link>
    )
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-[#1a1a1a] rounded-lg md:hidden"
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 h-screen w-[240px] bg-black border-r border-[#2d2d2d] z-50
        transform transition-transform duration-300 ease-in-out
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-[#2d2d2d]">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#ff6b9d] to-[#e91e63] rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <span className="text-2xl font-bold text-white">MyCrew</span>
            </Link>
          </div>

          {/* Main Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
            {navItems.map((item) => (
              <NavItem key={item.href} {...item} />
            ))}

            {/* Creator Section */}
            {isCreator && (
              <>
                <div className="pt-6 pb-2 px-4">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Creator Tools
                  </span>
                </div>
                {creatorItems.map((item) => (
                  <NavItem key={item.href} {...item} />
                ))}
              </>
            )}
          </nav>

          {/* Bottom Section */}
          <div className="p-4 border-t border-[#2d2d2d] space-y-1">
            <NavItem icon={Settings} label="Settings" href="/settings" />
            
            {/* User Profile Mini */}
            {session?.user && (
              <div className="flex items-center gap-3 px-4 py-3 mt-2 rounded-lg bg-[#1a1a1a]">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff6b9d] to-[#e91e63] flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {session.user.name?.[0] || 'U'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {session.user.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    @{session.user.username}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  )
}
