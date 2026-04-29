import { 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight, 
  Download,
  CheckCircle,
  Clock,
  AlertCircle,
  CreditCard,
  Wallet
} from 'lucide-react'

// Mock data
const stats = {
  totalRevenue: 45280,
  pendingPayouts: 12340,
  processedPayouts: 38900,
  platformFees: 4528,
  thisMonth: 8940,
  lastMonth: 7230,
}

const recentTransactions = [
  { id: 'TXN001', type: 'subscription', creator: 'Jessica Model', amount: 150, fee: 15, net: 135, status: 'completed', date: '2024-01-15' },
  { id: 'TXN002', type: 'tip', creator: 'Mike Fitness', amount: 50, fee: 5, net: 45, status: 'completed', date: '2024-01-15' },
  { id: 'TXN003', type: 'ppv', creator: 'Gaming Queen', amount: 25, fee: 2.50, net: 22.50, status: 'pending', date: '2024-01-14' },
  { id: 'TXN004', type: 'subscription', creator: 'Artistic Babe', amount: 200, fee: 20, net: 180, status: 'completed', date: '2024-01-14' },
  { id: 'TXN005', type: 'live_stream', creator: 'Cooking Sarah', amount: 75, fee: 7.50, net: 67.50, status: 'completed', date: '2024-01-13' },
]

const pendingPayouts = [
  { id: 'PAY001', creator: 'Jessica Model', amount: 2840, method: 'Bank Transfer', requested: '2024-01-10', status: 'pending' },
  { id: 'PAY002', creator: 'Mike Fitness', amount: 1950, method: 'PayPal', requested: '2024-01-11', status: 'pending' },
  { id: 'PAY003', creator: 'Gaming Queen', amount: 1230, method: 'Bank Transfer', requested: '2024-01-12', status: 'processing' },
  { id: 'PAY004', creator: 'Artistic Babe', amount: 3420, method: 'PayPal', requested: '2024-01-12', status: 'pending' },
  { id: 'PAY005', creator: 'Cooking Sarah', amount: 890, method: 'Bank Transfer', requested: '2024-01-13', status: 'pending' },
]

export default function AccountingPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Accounting & Payouts</h1>
          <p className="text-gray-400">Manage transactions, payouts, and financial reports</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] hover:bg-[#2d2d2d] text-white rounded-lg border border-[#2d2d2d] transition-colors">
            <Download size={18} />
            <span>Export Report</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#ff6b9d] hover:bg-[#f06292] text-white rounded-lg transition-colors">
            <DollarSign size={18} />
            <span>Process Payouts</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          icon={DollarSign}
          label="Total Revenue"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          change="+23%"
          trend="up"
        />
        <StatCard 
          icon={Wallet}
          label="Pending Payouts"
          value={`$${stats.pendingPayouts.toLocaleString()}`}
          change="12 creators"
          trend="neutral"
        />
        <StatCard 
          icon={CheckCircle}
          label="Processed Payouts"
          value={`$${stats.processedPayouts.toLocaleString()}`}
          change="+18%"
          trend="up"
        />
        <StatCard 
          icon={CreditCard}
          label="Platform Fees (10%)"
          value={`$${stats.platformFees.toLocaleString()}`}
          change="This month"
          trend="neutral"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Payouts */}
        <div className="bg-[#121212] rounded-xl border border-[#2d2d2d] p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Pending Payouts</h2>
            <span className="px-3 py-1 bg-yellow-500/20 text-yellow-500 rounded-full text-sm font-medium">
              {pendingPayouts.length} pending
            </span>
          </div>
          <div className="space-y-3">
            {pendingPayouts.map((payout) => (
              <div key={payout.id} className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`
                    w-10 h-10 rounded-lg flex items-center justify-center
                    ${payout.status === 'processing' ? 'bg-blue-500/20 text-blue-500' : 'bg-yellow-500/20 text-yellow-500'}
                  `}>
                    {payout.status === 'processing' ? <Clock size={18} /> : <AlertCircle size={18} />}
                  </div>
                  <div>
                    <p className="text-white font-medium">{payout.creator}</p>
                    <p className="text-gray-500 text-sm">{payout.method} • {payout.requested}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold">${payout.amount.toLocaleString()}</p>
                  <button className="text-[#ff6b9d] text-sm hover:underline">
                    Process
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-3 bg-[#ff6b9d] hover:bg-[#f06292] text-white rounded-lg font-medium transition-colors">
            Process All Payouts
          </button>
        </div>

        {/* Recent Transactions */}
        <div className="bg-[#121212] rounded-xl border border-[#2d2d2d] p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Recent Transactions</h2>
            <button className="text-[#ff6b9d] text-sm hover:underline">View All</button>
          </div>
          <div className="space-y-3">
            {recentTransactions.map((txn) => (
              <div key={txn.id} className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`
                    w-10 h-10 rounded-lg flex items-center justify-center
                    ${txn.status === 'completed' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'}
                  `}>
                    {txn.status === 'completed' ? <CheckCircle size={18} /> : <Clock size={18} />}
                  </div>
                  <div>
                    <p className="text-white font-medium capitalize">{txn.type.replace('_', ' ')}</p>
                    <p className="text-gray-500 text-sm">{txn.creator} • {txn.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold">${txn.amount}</p>
                  <p className="text-gray-500 text-sm">Fee: ${txn.fee}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Overview */}
      <div className="bg-[#121212] rounded-xl border border-[#2d2d2d] p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Monthly Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-[#1a1a1a] rounded-lg">
            <p className="text-gray-400 text-sm">This Month</p>
            <p className="text-2xl font-bold text-white mt-1">${stats.thisMonth.toLocaleString()}</p>
            <div className="flex items-center gap-1 mt-2 text-green-500">
              <ArrowUpRight size={16} />
              <span className="text-sm">+24% vs last month</span>
            </div>
          </div>
          <div className="p-4 bg-[#1a1a1a] rounded-lg">
            <p className="text-gray-400 text-sm">Last Month</p>
            <p className="text-2xl font-bold text-white mt-1">${stats.lastMonth.toLocaleString()}</p>
            <div className="flex items-center gap-1 mt-2 text-gray-500">
              <span className="text-sm">Baseline</span>
            </div>
          </div>
          <div className="p-4 bg-[#1a1a1a] rounded-lg">
            <p className="text-gray-400 text-sm">Projected (Month End)</p>
            <p className="text-2xl font-bold text-white mt-1">$12,500</p>
            <div className="flex items-center gap-1 mt-2 text-green-500">
              <ArrowUpRight size={16} />
              <span className="text-sm">+40% growth</span>
            </div>
          </div>
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
      </div>
    </div>
  )
}
