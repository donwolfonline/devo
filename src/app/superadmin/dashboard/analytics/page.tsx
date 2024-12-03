'use client';

import { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  Activity, 
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import DashboardHeading from '@/components/shared/DashboardHeading';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d');

  const stats = [
    {
      name: 'Total Users',
      value: '12,345',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'purple'
    },
    {
      name: 'Active Sessions',
      value: '2,876',
      change: '+25%',
      trend: 'up',
      icon: Activity,
      color: 'blue'
    },
    {
      name: 'Avg. Session Time',
      value: '24m 30s',
      change: '-5%',
      trend: 'down',
      icon: Clock,
      color: 'green'
    },
    {
      name: 'Conversion Rate',
      value: '3.2%',
      change: '+8%',
      trend: 'up',
      icon: TrendingUp,
      color: 'pink'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <div className="p-8 md:p-10 max-w-[2000px] mx-auto">
        <DashboardHeading 
          title="Analytics Overview" 
          subtitle="Monitor system performance and user activity" 
        />

        {/* Time Range Selector */}
        <div className="mb-8">
          <div className="inline-flex rounded-lg border border-purple-500/10 bg-[#13131f] p-1">
            {['24h', '7d', '30d', '90d'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  timeRange === range
                    ? 'bg-purple-500/10 text-purple-400'
                    : 'text-gray-400 hover:text-purple-400'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.name}
                className="bg-[#13131f] rounded-xl p-6 border border-purple-500/10"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-lg bg-${stat.color}-500/10`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-400`} />
                  </div>
                  <div className={`flex items-center ${
                    stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    <span className="text-sm font-medium">{stat.change}</span>
                    {stat.trend === 'up' ? (
                      <ArrowUpRight className="w-4 h-4 ml-1" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 ml-1" />
                    )}
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-200">{stat.value}</div>
                <div className="mt-1 text-sm text-gray-400">{stat.name}</div>
              </div>
            );
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* User Activity Chart */}
          <div className="bg-[#13131f] rounded-xl p-6 border border-purple-500/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-200">User Activity</h2>
              <select className="bg-[#1a1a27] text-gray-400 text-sm rounded-lg border border-purple-500/10 px-3 py-1.5 focus:outline-none focus:border-purple-500/30">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
            </div>
            <div className="h-[300px] flex items-center justify-center text-gray-400">
              Chart Component Here
            </div>
          </div>

          {/* Traffic Sources */}
          <div className="bg-[#13131f] rounded-xl p-6 border border-purple-500/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-200">Traffic Sources</h2>
              <select className="bg-[#1a1a27] text-gray-400 text-sm rounded-lg border border-purple-500/10 px-3 py-1.5 focus:outline-none focus:border-purple-500/30">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
            </div>
            <div className="h-[300px] flex items-center justify-center text-gray-400">
              Chart Component Here
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
