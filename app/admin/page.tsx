import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Activity,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react'

// Mock data - would come from API
const stats = {
  totalUsers: 1247,
  totalCreators: 89,
  totalRevenue: 45280,
  monthlyGrowth: 23,
  pendingVerifications: 12,
  activeStreams: 5,
  flaggedContent: 3,
  supportTickets: 8
}

const recentActivity = [
  { id: 1, type: 'new_creator', message: 'Jessica Model joined as creator', time: '2 min ago' },
  { id: 2, type: 'payment', message: '$1,240 payout processed', time: '5 min ago' },
  { id: 3, type: 'flagged', message: 'Content flagged for review', time: '12 min ago' },
  { id: 4, type: 'verification', message: 'Mike Fitness verified', time: '15 min ago' },
  { id: 5, type: 'stream', message: 'Live stream started: Gaming Queen', time: '18 min ago' },
]

const topCreators = [
  { id: 1, name: 'Jessica Model', earnings: 8450, subscribers: 420, growth: 15 },
  { id: 2, name: 'Mike Fitness', earnings: 6230, subscribers: 310, growth: 23 },
  { id: 3, name: 'Gaming Queen', earnings: 5890, subscribers: 280, growth: 8 },
  { id: 4, name: 'Artistic Babe', earnings: 4520, subscribers: 195, growth: 31 },
  { id: 5, name: 'Cooking Sarah', earnings: 3890, subscribers: 167, growth: 12 },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400">Welcome back, Admin</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400">Last updated: Just now</span>
          <button className="px-4 py-2 bg-[#ff6b9d] hover:bg-[#f06292] text-white rounded-lg text-sm font-medium transition-colors">
            Refresh
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          icon={Users}
          label="Total Users"
          value={stats.totalUsers.toLocaleString()}
          change="+12%"
          trend="up"
        />
        <StatCard 
          icon={TrendingUp}
          label="Total Creators"
          value={stats.totalCreators.toString()}
          change="+5"
          trend="up"
        />
        <StatCard 
          icon={DollarSign}
          label="Total Revenue"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          change="+23%"
          trend="up"
        />
        <StatCard 
          icon={Activity}
          label="Active Streams"
          value={stats.activeStreams.toString()}
          change="Live"
          trend="neutral"
        />
      </div>

      {/* Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AlertCard 
          icon={Clock}
          label="Pending Verifications"
          value={stats.pendingVerifications}
          color="yellow"
          href="/admin/verifications"
        />
        <AlertCard 
          icon={AlertCircle}
          label="Flagged Content"
          value={stats.flaggedContent}
          color="red"
          href="/admin/moderation"
        />
        <AlertCard 
          icon={CheckCircle}
          label="Support Tickets"
          value={stats.supportTickets}
          color="blue"
          href="/admin/support"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-[#121212] rounded-xl border border-[#2d2d2d] p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className={`
                  w-2 h-2 rounded-full mt-2
                  ${activity.type === 'new_creator' ? 'bg-green-500' : ''}
                  ${activity.type === 'payment' ? 'bg-[#ff6b9d]' : ''}
                  ${activity.type === 'flagged' ? 'bg-red-500' : ''}
                  ${activity.type === 'verification' ? 'bg-blue-500' : ''}
                  ${activity.type === 'stream' ? 'bg-purple-500' : ''}
                `} />
                <div className="flex-1">
                  <p className="text-white text-sm">{activity.message}</p>
                  <p className="text-gray-500 text-xs">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-[#ff6b9d] text-sm hover:underline">
            View All Activity
          </button>
        </div>

        {/* Top Creators */}
        <div className="bg-[#121212] rounded-xl border border-[#2d2d2d] p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Top Creators</h2>
          <div className="space-y-4">
            {topCreators.map((creator, index) => (
              <div key={creator.id} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff6b9d] to-[#e91e63] flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">{creator.name}</p>
                  <p className="text-gray-500 text-xs">{creator.subscribers} subscribers</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold">${creator.earnings.toLocaleString()}</p>
                  <p className="text-green-500 text-xs">+{creator.growth}%</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-[#ff6b9d] text-sm hover:underline">
            View All Creators
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-[#121212] rounded-xl border border-[#2d2d2d] p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <QuickActionButton label="Verify Creator" href="/admin/verifications" />
          <QuickActionButton label="Review Content" href="/admin/moderation" />
          <QuickActionButton label="Process Payouts" href="/admin/payouts" />
          <QuickActionButton label="Send Announcement" href="/admin/announcements" />
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, change, trend }: {
  icon: any
  label: string
  value: string
  change: string
  trend: 'up' | 'down' | 'neutral'
}) {
  return (
    <div className="bg-[#121212] rounded-xl border border-[#2d2d2d] p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-400 text-sm">{label}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
        </div>
        <div className="p-2 bg-[#1a1a1a] rounded-lg">
          <Icon size={20} className="text-[#ff6b9d]" />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <span className={`
          text-sm font-medium
          ${trend === 'up' ? 'text-green-500' : ''}
          ${trend === 'down' ? 'text-red-500' : ''}
          ${trend === 'neutral' ? 'text-gray-400' : ''}
        `}>
          {change}
        </span>
        <span className="text-gray-500 text-sm">vs last month</span>
      </div>
    </div>
  )
}

function AlertCard({ icon: Icon, label, value, color, href }: {
  icon: any
  label: string
  value: number
  color: 'yellow' | 'red' | 'blue'
  href: string
}) {
  const colorClasses = {
    yellow: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30',
    red: 'bg-red-500/20 text-red-500 border-red-500/30',
    blue: 'bg-blue-500/20 text-blue-500 border-blue-500/30',
  }

  return (
    <a href={href} className={`
      flex items-center gap-4 p-4 rounded-xl border transition-colors
      ${colorClasses[color]}
      hover:opacity-80
    `}>
      <Icon size={24} />
      <div>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm opacity-80">{label}</p>
      </div>
    </a>
  )
}

function QuickActionButton({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      className="block p-4 bg-[#1a1a1a] hover:bg-[#2d2d2d] border border-[#2d2d2d] rounded-lg text-center transition-colors"
    >
      <span className="text-white text-sm font-medium">{label}</span>
    </a>
  )
}
