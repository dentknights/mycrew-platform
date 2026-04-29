import {
  Users,
  Search,
  Filter,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Clock,
  Shield,
} from 'lucide-react'

// Mock data
const users = [
  { id: 1, name: 'Jessica Model', email: 'jessica@email.com', type: 'creator', status: 'active', verified: true, followers: 45200, earnings: 8450, joined: '2024-01-10' },
  { id: 2, name: 'Mike Fitness', email: 'mike@email.com', type: 'creator', status: 'active', verified: true, followers: 32100, earnings: 6230, joined: '2024-01-12' },
  { id: 3, name: 'John Doe', email: 'john@email.com', type: 'fan', status: 'active', verified: false, followers: 0, earnings: 0, joined: '2024-01-15' },
  { id: 4, name: 'Gaming Queen', email: 'gaming@email.com', type: 'creator', status: 'pending', verified: false, followers: 15600, earnings: 0, joined: '2024-01-16' },
  { id: 5, name: 'Sarah Smith', email: 'sarah@email.com', type: 'fan', status: 'active', verified: true, followers: 0, earnings: 0, joined: '2024-01-14' },
  { id: 6, name: 'Artistic Babe', email: 'art@email.com', type: 'creator', status: 'suspended', verified: true, followers: 28900, earnings: 4520, joined: '2023-12-20' },
]

const stats = {
  totalUsers: 1247,
  totalCreators: 89,
  pendingVerifications: 12,
  suspendedAccounts: 3,
}

export default function UsersPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Users & Creators</h1>
          <p className="text-gray-400">Manage user accounts and creator verifications</p>
        </div>
        <button className="px-4 py-2 bg-[#ff6b9d] hover:bg-[#f06292] text-white rounded-lg transition-colors">
          + Add User
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Total Users" value={stats.totalUsers.toString()} icon={Users} />
        <StatCard label="Creators" value={stats.totalCreators.toString()} icon={Shield} />
        <StatCard label="Pending Verification" value={stats.pendingVerifications.toString()} icon={Clock} color="yellow" />
        <StatCard label="Suspended" value={stats.suspendedAccounts.toString()} icon={XCircle} color="red" />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 bg-[#121212] p-4 rounded-xl border border-[#2d2d2d]">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Search users..."
            className="w-full bg-[#1a1a1a] border border-[#2d2d2d] rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6b9d]"
          />
        </div>
        <select className="bg-[#1a1a1a] border border-[#2d2d2d] text-white rounded-lg px-4 py-2">
          <option>All Types</option>
          <option>Creators</option>
          <option>Fans</option>
        </select>
        <select className="bg-[#1a1a1a] border border-[#2d2d2d] text-white rounded-lg px-4 py-2">
          <option>All Status</option>
          <option>Active</option>
          <option>Pending</option>
          <option>Suspended</option>
        </select>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] hover:bg-[#2d2d2d] text-white rounded-lg border border-[#2d2d2d] transition-colors">
          <Filter size={18} />
          <span>Filter</span>
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-[#121212] rounded-xl border border-[#2d2d2d] overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#1a1a1a] border-b border-[#2d2d2d]">
            <tr>
              <th className="text-left text-gray-400 font-medium py-4 px-6">User</th>
              <th className="text-left text-gray-400 font-medium py-4 px-4">Type</th>
              <th className="text-left text-gray-400 font-medium py-4 px-4">Status</th>
              <th className="text-left text-gray-400 font-medium py-4 px-4">Followers</th>
              <th className="text-left text-gray-400 font-medium py-4 px-4">Earnings</th>
              <th className="text-left text-gray-400 font-medium py-4 px-4">Joined</th>
              <th className="text-left text-gray-400 font-medium py-4 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-[#2d2d2d] hover:bg-[#1a1a1a]">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff6b9d] to-[#e91e63] flex items-center justify-center text-white font-semibold">
                      {user.name[0]}
                    </div>
                    <div>
                      <p className="text-white font-medium">{user.name}</p>
                      <p className="text-gray-500 text-sm">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    user.type === 'creator' ? 'bg-[#ff6b9d]/20 text-[#ff6b9d]' : 'bg-blue-500/20 text-blue-500'
                  }`}>
                    {user.type}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    user.status === 'active' ? 'bg-green-500/20 text-green-500' :
                    user.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                    'bg-red-500/20 text-red-500'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-white">{user.followers > 0 ? user.followers.toLocaleString() : '-'}</td>
                <td className="py-4 px-4 text-white">{user.earnings > 0 ? `$${user.earnings.toLocaleString()}` : '-'}</td>
                <td className="py-4 px-4 text-gray-400">{user.joined}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    {user.status === 'pending' && (
                      <>
                        <button className="p-2 text-green-500 hover:bg-green-500/20 rounded-lg transition-colors">
                          <CheckCircle size={18} />
                        </button>
                        <button className="p-2 text-red-500 hover:bg-red-500/20 rounded-lg transition-colors">
                          <XCircle size={18} />
                        </button>
                      </>
                    )}
                    <button className="p-2 text-gray-400 hover:text-white hover:bg-[#2d2d2d] rounded-lg transition-colors">
                      <MoreHorizontal size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function StatCard({ label, value, icon: Icon, color = 'pink' }: {
  label: string
  value: string
  icon: any
  color?: 'pink' | 'yellow' | 'red'
}) {
  const colorClasses = {
    pink: 'bg-[#ff6b9d]/20 text-[#ff6b9d]',
    yellow: 'bg-yellow-500/20 text-yellow-500',
    red: 'bg-red-500/20 text-red-500',
  }

  return (
    <div className="bg-[#121212] rounded-xl border border-[#2d2d2d] p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm">{label}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon size={20} />
        </div>
      </div>
    </div>
  )
}
