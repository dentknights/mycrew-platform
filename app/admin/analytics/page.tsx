'use client'

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
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import {
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  Download,
} from 'lucide-react'

// Mock data
const revenueData = [
  { name: 'Jan', revenue: 4000, creators: 20 },
  { name: 'Feb', revenue: 5500, creators: 35 },
  { name: 'Mar', revenue: 7200, creators: 50 },
  { name: 'Apr', revenue: 8900, creators: 80 },
  { name: 'May', revenue: 12400, creators: 120 },
  { name: 'Jun', revenue: 15200, creators: 175 },
]

const userGrowthData = [
  { name: 'Week 1', users: 120, creators: 5 },
  { name: 'Week 2', users: 280, creators: 12 },
  { name: 'Week 3', users: 450, creators: 18 },
  { name: 'Week 4', users: 620, creators: 25 },
]

const revenueSourceData = [
  { name: 'Subscriptions', value: 65, color: '#ff6b9d' },
  { name: 'Tips', value: 20, color: '#e91e63' },
  { name: 'PPV Content', value: 10, color: '#9c27b0' },
  { name: 'Live Streams', value: 5, color: '#673ab7' },
]

const topCountries = [
  { country: 'United States', users: 450, revenue: 18500 },
  { country: 'United Kingdom', users: 120, revenue: 5200 },
  { country: 'Canada', users: 95, revenue: 4100 },
  { country: 'Australia', users: 65, revenue: 2800 },
  { country: 'Germany', users: 45, revenue: 1900 },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics Dashboard</h1>
          <p className="text-gray-400">Platform performance and insights</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="bg-[#1a1a1a] border border-[#2d2d2d] text-white rounded-lg px-4 py-2">
            <option>Last 30 Days</option>
            <option>Last 7 Days</option>
            <option>Last 90 Days</option>
            <option>This Year</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] hover:bg-[#2d2d2d] text-white rounded-lg border border-[#2d2d2d] transition-colors">
            <Download size={18} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          icon={TrendingUp}
          label="Total Revenue"
          value="$45,280"
          change="+23.5%"
          trend="up"
        />
        <MetricCard
          icon={Users}
          label="Active Users"
          value="1,247"
          change="+12.3%"
          trend="up"
        />
        <MetricCard
          icon={DollarSign}
          label="Avg Revenue/User"
          value="$36.32"
          change="+8.1%"
          trend="up"
        />
        <MetricCard
          icon={Activity}
          label="Engagement Rate"
          value="68.4%"
          change="-2.1%"
          trend="down"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Growth */}
        <div className="bg-[#121212] rounded-xl border border-[#2d2d2d] p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Revenue & Creator Growth</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2d2d2d" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis yAxisId="left" stroke="#666" />
                <YAxis yAxisId="right" orientation="right" stroke="#666" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #2d2d2d',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: '#fff' }}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#ff6b9d"
                  strokeWidth={2}
                  name="Revenue ($)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="creators"
                  stroke="#e91e63"
                  strokeWidth={2}
                  name="Creators"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Growth */}
        <div className="bg-[#121212] rounded-xl border border-[#2d2d2d] p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Weekly User Growth</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2d2d2d" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #2d2d2d',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: '#fff' }}
                />
                <Bar dataKey="users" fill="#ff6b9d" name="Total Users" />
                <Bar dataKey="creators" fill="#e91e63" name="Creators" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Sources */}
        <div className="bg-[#121212] rounded-xl border border-[#2d2d2d] p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Revenue Sources</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={revenueSourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {revenueSourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #2d2d2d',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4">
            {revenueSourceData.map((source) => (
              <div key={source.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: source.color }}
                  />
                  <span className="text-gray-400 text-sm">{source.name}</span>
                </div>
                <span className="text-white font-medium">{source.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Countries */}
        <div className="lg:col-span-2 bg-[#121212] rounded-xl border border-[#2d2d2d] p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Top Countries</h2>
          <div className="space-y-4">
            {topCountries.map((country, index) => (
              <div key={country.country} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center text-white font-medium">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">{country.country}</p>
                  <div className="w-full bg-[#1a1a1a] rounded-full h-2 mt-2">
                    <div
                      className="bg-gradient-to-r from-[#ff6b9d] to-[#e91e63] h-2 rounded-full"
                      style={{ width: `${(country.users / 450) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">{country.users} users</p>
                  <p className="text-gray-500 text-sm">${country.revenue.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#121212] rounded-xl border border-[#2d2d2d] p-6">
          <h3 className="text-gray-400 text-sm mb-2">Avg Session Duration</h3>
          <p className="text-3xl font-bold text-white">12m 34s</p>
          <p className="text-green-500 text-sm mt-1">+18% vs last month</p>
        </div>
        <div className="bg-[#121212] rounded-xl border border-[#2d2d2d] p-6">
          <h3 className="text-gray-400 text-sm mb-2">Content Uploads</h3>
          <p className="text-3xl font-bold text-white">1,847</p>
          <p className="text-green-500 text-sm mt-1">+42% vs last month</p>
        </div>
        <div className="bg-[#121212] rounded-xl border border-[#2d2d2d] p-6">
          <h3 className="text-gray-400 text-sm mb-2">Support Tickets</h3>
          <p className="text-3xl font-bold text-white">23</p>
          <p className="text-red-500 text-sm mt-1">+5 vs last month</p>
        </div>
      </div>
    </div>
  )
}

function MetricCard({
  icon: Icon,
  label,
  value,
  change,
  trend,
}: {
  icon: any
  label: string
  value: string
  change: string
  trend: 'up' | 'down'
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
        <span
          className={`text-sm font-medium ${
            trend === 'up' ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {change}
        </span>
        <span className="text-gray-500 text-sm">vs last month</span>
      </div>
    </div>
  )
}
