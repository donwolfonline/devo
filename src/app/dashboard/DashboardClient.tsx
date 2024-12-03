'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { UsernameManager } from '@/components/UsernameManager';

interface DashboardStats {
  portfolioViews: number;
  profileVisits: number;
  projects: number;
  skills: number;
}

interface RecentActivity {
  id: number;
  type: 'project' | 'skill' | 'view' | 'update' | 'profile';
  description: string;
  date: string;
}

interface User {
  id: string;
  name?: string;
  email?: string;
  username?: string;
}

interface DashboardClientProps {
  user: User;
}

export default function DashboardClient({ user }: DashboardClientProps) {
  const [stats, setStats] = useState<DashboardStats>({
    portfolioViews: 0,
    profileVisits: 0,
    projects: 0,
    skills: 0,
  });
  
  const [loading, setLoading] = useState(true);
  const [recentActivity] = useState<RecentActivity[]>([
    {
      id: 1,
      type: 'update',
      description: 'Updated portfolio description',
      date: '2 hours ago',
    },
    {
      id: 2,
      type: 'project',
      description: 'Added new project: DevShowcase',
      date: '1 day ago',
    },
    {
      id: 3,
      type: 'skill',
      description: 'Added new skill: Next.js',
      date: '2 days ago',
    },
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStats({
          portfolioViews: 1234,
          profileVisits: 567,
          projects: 12,
          skills: 25,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 md:p-6 rounded-lg bg-[#1a1a24] hover:bg-[#1f1f2d] transition-colors border border-gray-800"
        >
          <div className="flex flex-col space-y-2">
            <h3 className="font-semibold text-white text-sm md:text-base">Portfolio Views</h3>
            <p className="text-lg font-semibold text-purple-400">
              {loading ? '...' : stats.portfolioViews}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-4 md:p-6 rounded-lg bg-[#1a1a24] hover:bg-[#1f1f2d] transition-colors border border-gray-800"
        >
          <div className="flex flex-col space-y-2">
            <h3 className="font-semibold text-white text-sm md:text-base">Profile Visits</h3>
            <p className="text-lg font-semibold text-purple-400">
              {loading ? '...' : stats.profileVisits}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-4 md:p-6 rounded-lg bg-[#1a1a24] hover:bg-[#1f1f2d] transition-colors border border-gray-800"
        >
          <div className="flex flex-col space-y-2">
            <h3 className="font-semibold text-white text-sm md:text-base">Total Projects</h3>
            <p className="text-lg font-semibold text-purple-400">
              {loading ? '...' : stats.projects}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-4 md:p-6 rounded-lg bg-[#1a1a24] hover:bg-[#1f1f2d] transition-colors border border-gray-800"
        >
          <div className="flex flex-col space-y-2">
            <h3 className="font-semibold text-white text-sm md:text-base">Skills</h3>
            <p className="text-lg font-semibold text-purple-400">
              {loading ? '...' : stats.skills}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <div className="bg-[#1a1a24] border border-gray-800 rounded-lg p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-semibold text-white mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: activity.id * 0.1 }}
              className="p-3 md:p-4 rounded-lg bg-[#1f1f2d] border border-gray-800"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-purple-500">
                    {getActivityIcon(activity.type)}
                  </span>
                  <p className="text-gray-300 text-sm md:text-base">{activity.description}</p>
                </div>
                <span className="text-xs md:text-sm text-gray-500 whitespace-nowrap">{activity.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function getActivityIcon(type: RecentActivity['type']) {
  switch (type) {
    case 'project':
      return '📁';
    case 'skill':
      return '⚡';
    case 'view':
      return '👀';
    case 'update':
      return '✏️';
    case 'profile':
      return '👤';
    default:
      return '📌';
  }
}
