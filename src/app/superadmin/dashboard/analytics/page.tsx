'use client';

import { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Users, 
  Activity, 
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp
} from 'lucide-react';
import DashboardHeading from '@/components/shared/DashboardHeading';
import { BarChart, LineChart } from '@/components/charts';

interface AnalyticsData {
  totalUsers: number;
  newUsers: number;
  activeSessions: number;
  avgSessionTime: number;
  conversionRate: number;
  userGrowth: number;
  sessionGrowth: number;
  trafficSources: Array<{ source: string; count: number }>;
  userActivity: Array<{ date: string; count: number }>;
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/superadmin/analytics?timeRange=${timeRange}`);
        if (!response.ok) {
          throw new Error('Failed to fetch analytics data');
        }
        
        const analyticsData = await response.json();
        setData(analyticsData);
      } catch (err) {
        console.error('Error fetching analytics:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch analytics');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [timeRange]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="w-8 h-8 border-t-2 border-b-2 border-purple-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] p-8">
        <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 text-red-500">
          {error}
        </div>
      </div>
    );
  }

  if (!data) return null;

  const stats = [
    {
      name: 'Total Users',
      value: data.totalUsers.toLocaleString(),
      change: `${data.userGrowth >= 0 ? '+' : ''}${data.userGrowth.toFixed(1)}%`,
      trend: data.userGrowth >= 0 ? 'up' : 'down',
      icon: Users,
      color: 'purple'
    },
    {
      name: 'Active Sessions',
      value: data.activeSessions.toLocaleString(),
      change: `${data.sessionGrowth >= 0 ? '+' : ''}${data.sessionGrowth.toFixed(1)}%`,
      trend: data.sessionGrowth >= 0 ? 'up' : 'down',
      icon: Activity,
      color: 'blue'
    },
    {
      name: 'Avg. Session Time',
      value: formatDuration(data.avgSessionTime),
      change: '±0%',
      trend: 'neutral',
      icon: Clock,
      color: 'green'
    },
    {
      name: 'Conversion Rate',
      value: `${data.conversionRate.toFixed(1)}%`,
      change: '±0%',
      trend: 'neutral',
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
                    stat.trend === 'up' ? 'text-green-400' : 
                    stat.trend === 'down' ? 'text-red-400' : 
                    'text-gray-400'
                  }`}>
                    <span className="text-sm font-medium">{stat.change}</span>
                    {stat.trend === 'up' ? (
                      <ArrowUpRight className="w-4 h-4 ml-1" />
                    ) : stat.trend === 'down' ? (
                      <ArrowDownRight className="w-4 h-4 ml-1" />
                    ) : null}
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-semibold text-white">
                    {stat.value}
                  </h3>
                  <p className="text-sm text-gray-400">{stat.name}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* User Activity Chart */}
          <div className="bg-[#13131f] rounded-xl p-6 border border-purple-500/10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">User Activity</h3>
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </div>
            <div className="h-[300px]">
              <LineChart
                data={data.userActivity}
                xKey="date"
                yKey="count"
                color="#8b5cf6"
              />
            </div>
          </div>

          {/* Traffic Sources Chart */}
          <div className="bg-[#13131f] rounded-xl p-6 border border-purple-500/10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Traffic Sources</h3>
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </div>
            <div className="h-[300px]">
              <BarChart
                data={data.trafficSources}
                xKey="source"
                yKey="count"
                color="#8b5cf6"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
}
