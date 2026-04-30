'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts'
import {
  DollarSign,
  Users,
  Eye,
  Heart,
  TrendingUp,
  Video,
  Image as ImageIcon,
  Plus,
  ChevronRight,
  Wallet,
} from 'lucide-react'

// Mock data - would come from API
const earningsData = [
  { name: 'Mon', earnings: 245, subscribers: 12 },
  { name: 'Tue', earnings: 380, subscribers: 15 },
  { name: 'Wed', earnings: 290, subscribers: 8 },
  { name: 'Thu', earnings: 450, subscribers: 22 },
  { name: 'Fri', earnings: 520, subscribers: 28 },
  { name: 'Sat', earnings: 680, subscribers: 35 },
  { name: 'Sun', earnings: 590, subscribers: 30 },
]

const monthlyData = [
  { name: 'Jan', earnings: 4200, views: 45000 },
  { name: 'Feb', earnings: 5100, views: 52000 },
  { name: 'Mar', earnings: 4800, views: 48000 },
  { name: 'Apr', earnings: 6200, views: 61000 },
  { name: 'May', earnings: 7500, views: 72000 },
  { name: 'Jun', earnings: 8900, views: 85000 },
]

const recentActivity = [
  { type: 'subscription', user: 'john_doe', amount: 14.99, time: '2 min ago' },
  { type: 'tip', user: 'sarah_m', amount: 25.00, time: '15 min ago' },
  { type: 'ppv', user: 'mike_89', amount: 9.99, time: '32 min ago' },
  { type: 'subscription', user: 'alex_k', amount: 29.99, time: '1 hour ago' },
]

const topContent = [
  { id: '1', title: 'Summer Photoshoot', type: 'image', views: 12450, likes: 892, earnings: 340 },
  { id: '2', title: 'Behind the Scenes', type: 'video', views: 8930, likes: 645, earnings: 280 },
  { id: '3', title: 'Q&A Session', type: 'video', views: 6720, likes: 423, earnings: 195 },
]

export default function CreatorDashboard() {
  const [timeRange, setTimeRange] = useState('7d')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Creator Dashboard</h1>
          <p className="text-[#6b7280] mt-1">Track your performance and earnings</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-[#161616] border border-[#262626] text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#0095f6]"
          >
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <Link
            href="/creator/content/new"
            className="flex items-center gap-2 px-4 py-2 bg-[#0095f6] hover:bg-[#1877f2] text-white rounded-lg font-semibold transition-all text-sm"
          >
            <Plus size={18} />
            <span>Create</span>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={DollarSign}
          label="Total Earnings"
          value="$3,155"
          change="+23.5%"
          trend="up"
          subtext="This month"
        />
        <StatCard
          icon={Users}
          label="Subscribers"
          value="1,247"
          change="+12.3%"
          trend="up"
          subtext="Active now"
        />
        <StatCard
          icon={Eye}
          label="Total Views"
          value="45.2K"
          change="+8.1%"
          trend="up"
          subtext="This month"
        />
        <StatCard
          icon={Heart}
          label="Engagement"
          value="8.4%"
          change="-2.1%"
          trend="down"
          subtext="Avg rate"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Earnings Chart */}
        <div className="lg:col-span-2 bg-[#111111] rounded-xl border border-[#1f1f1f] p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Earnings Overview</h2>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-sm text-[#6b7280]">
                <span className="w-2 h-2 rounded-full bg-[#0095f6]" />
                Earnings
              </span>
              <span className="flex items-center gap-1.5 text-sm text-[#6b7280]">
                <span className="w-2 h-2 rounded-full bg-[#00d4aa]" />
                New Subs
              </span>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={earningsData}>
                <defs>
                  <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0095f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0095f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" />
                <XAxis dataKey="name" stroke="#4b5563" fontSize={12} />
                <YAxis stroke="#4b5563" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#111111',
                    border: '1px solid #262626',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: '#fff' }}
                />
                <Area
                  type="monotone"
                  dataKey="earnings"
                  stroke="#0095f6"
                  fillOpacity={1}
                  fill="url(#colorEarnings)"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="subscribers"
                  stroke="#00d4aa"
                  strokeWidth={2}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions & Balance */}
        <div className="space-y-6">
          {/* Balance Card */}
          <div className="bg-gradient-to-br from-[#0095f6]/20 to-[#00d4aa]/20 rounded-xl border border-[#0095f6]/30 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-[#0095f6]/20 rounded-lg">
                <Wallet size={20} className="text-[#0095f6]" />
              </div>
              <span className="text-[#9ca3af] font-medium">Available Balance</span>
            </div>
            <p className="text-3xl font-bold text-white mb-2">$2,450.00</p>
            <p className="text-sm text-[#6b7280] mb-4">Next payout: May 1, 2026</p>
            <button className="w-full py-2.5 bg-[#0095f6] hover:bg-[#1877f2] text-white rounded-lg font-semibold transition-all text-sm">
              Withdraw Funds
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-[#111111] rounded-xl border border-[#1f1f1f] p-6">
            <h3 className="text-white font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <QuickAction href="/creator/content/new" icon={ImageIcon} label="Upload Content" />
              <QuickAction href="/creator/live" icon={Video} label="Go Live" />
              <QuickAction href="/creator/earnings" icon={TrendingUp} label="View Earnings" />
              <QuickAction href="/creator/subscribers" icon={Users} label="Manage Subscribers" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-[#111111] rounded-xl border border-[#1f1f1f] p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
            <Link href="/creator/earnings" className="text-[#0095f6] hover:text-[#1877f2] text-sm font-medium flex items-center gap-1">
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-[#1f1f1f] last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === 'subscription' ? 'bg-[#0095f6]/10' :
                    activity.type === 'tip' ? 'bg-[#00d4aa]/10' : 'bg-[#f5c518]/10'
                  }`}>
                    {activity.type === 'subscription' && <Users size={18} className="text-[#0095f6]" />}
                    {activity.type === 'tip' && <DollarSign size={18} className="text-[#00d4aa]" />}
                    {activity.type === 'ppv' && <Eye size={18} className="text-[#f5c518]" />}
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">
                      {activity.type === 'subscription' && 'New Subscriber'}
                      {activity.type === 'tip' && 'Received Tip'}
                      {activity.type === 'ppv' && 'PPV Purchase'}
                    </p>
                    <p className="text-[#6b7280] text-xs">@{activity.user} • {activity.time}</p>
                  </div>
                </div>
                <span className="text-white font-semibold">+${activity.amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Content */}
        <div className="bg-[#111111] rounded-xl border border-[#1f1f1f] p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Top Content</h2>
            <Link href="/creator/content" className="text-[#0095f6] hover:text-[#1877f2] text-sm font-medium flex items-center gap-1">
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="space-y-4">
            {topContent.map((content) => (
              <div key={content.id} className="flex items-center gap-4 py-3 border-b border-[#1f1f1f] last:border-0">
                <div className="w-16 h-16 rounded-lg bg-[#161616] flex items-center justify-center flex-shrink-0">
                  {content.type === 'image' ? (
                    <ImageIcon size={24} className="text-[#6b7280]" />
                  ) : (
                    <Video size={24} className="text-[#6b7280]" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm truncate">{content.title}</p>
                  <div className="flex items-center gap-4 mt-1 text-xs text-[#6b7280]">
                    <span className="flex items-center gap-1">
                      <Eye size={12} /> {content.views.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart size={12} /> {content.likes.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold text-sm">${content.earnings}</p>
                  <p className="text-[#6b7280] text-xs">earned</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
  change,
  trend,
  subtext,
}: {
  icon: any
  label: string
  value: string
  change: string
  trend: 'up' | 'down'
  subtext: string
}) {
  return (
    <div className="bg-[#111111] rounded-xl border border-[#1f1f1f] p-5">
      <div className="flex items-start justify-between mb-3">
        <div className="p-2 bg-[#161616] rounded-lg">
          <Icon size={20} className="text-[#0095f6]" />
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
          trend === 'up' ? 'bg-[#00c853]/10 text-[#00c853]' : 'bg-[#ff3b30]/10 text-[#ff3b30]'
        }`}>
          {change}
        </span>
      </div>
      <p className="text-[#6b7280] text-sm">{label}</p>
      <p className="text-2xl font-bold text-white mt-1">{value}</p>
      <p className="text-[#4b5563] text-xs mt-1">{subtext}</p>
    </div>
  )
}

function QuickAction({ href, icon: Icon, label }: { href: string; icon: any; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#161616] hover:bg-[#1c1c1c] transition-all group"
    >
      <Icon size={18} className="text-[#6b7280] group-hover:text-[#0095f6] transition-colors" />
      <span className="text-[#9ca3af] group-hover:text-white text-sm font-medium flex-1">{label}</span>
      <ChevronRight size={16} className="text-[#4b5563] group-hover:text-[#9ca3af]" />
    </Link>
  )
}
