'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  DollarSign,
  BarChart3,
  Shield,
  MessageSquare,
  Settings,
  FileText,
  CreditCard,
  TrendingUp,
  AlertTriangle,
  LogOut
} from 'lucide-react'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: Users, label: 'Users & Creators', href: '/admin/users' },
  { icon: DollarSign, label: 'Accounting & Payouts', href: '/admin/accounting' },
  { icon: BarChart3, label: 'Analytics', href: '/admin/analytics' },
  { icon: Shield, label: 'Moderation', href: '/admin/moderation' },
  { icon: MessageSquare, label: 'Support Tickets', href: '/admin/support' },
  { icon: FileText, label: 'Reports', href: '/admin/reports' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-[#0a0a0a] border-r border-[#2d2d2d] flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-[#2d2d2d]">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#ff6b9d] to-[#e91e63] rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">M</span>
          </div>
          <div>
            <span className="text-xl font-bold text-white">MyCrew</span>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                ${isActive 
                  ? 'bg-[#ff6b9d] text-white' 
                  : 'text-gray-400 hover:bg-[#1a1a1a] hover:text-white'
                }
              `}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-[#2d2d2d]">
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#1a1a1a]">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff6b9d] to-[#e91e63] flex items-center justify-center text-white font-semibold text-sm">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">Admin User</p>
            <p className="text-gray-500 text-xs truncate">admin@mycrew.com</p>
          </div>
        </div>
        <button className="w-full mt-3 flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-red-400 transition-colors">
          <LogOut size={18} />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </aside>
  )
}
