'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { ThemeSelector } from '@/components/ThemeSelector';
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

export default function Dashboard() {
  const { data: session } = useSession();
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
      description: 'Added new project: E-commerce Dashboard',
      date: '1 day ago',
    },
    {
      id: 3,
      type: 'skill',
      description: 'Added new skill: TypeScript',
      date: '2 days ago',
    },
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/dashboard/stats');
        if (!response.ok) throw new Error('Failed to fetch stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user) {
      fetchStats();
    }
  }, [session]);

  const quickActions = [
    {
      name: 'Edit Portfolio',
      description: 'Update your portfolio content',
      href: '/dashboard/portfolio',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      name: 'Add Project',
      description: 'Showcase your work',
      href: '/dashboard/projects/new',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      ),
    },
    {
      name: 'View Profile',
      description: 'See your public profile page',
      href: '/profile',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      name: 'Analytics',
      description: 'View detailed statistics',
      href: '/dashboard/analytics',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
  ];

  const statsDisplay = [
    { name: 'Portfolio Views', value: stats.portfolioViews.toLocaleString() },
    { name: 'Profile Visits', value: stats.profileVisits.toLocaleString() },
    { name: 'Projects', value: stats.projects.toLocaleString() },
    { name: 'Skills', value: stats.skills.toLocaleString() },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {session?.user?.name || 'Developer'}
          </h1>
          <p className="mt-2 text-muted-foreground">
            Here's what's happening with your portfolio
          </p>
        </motion.div>
        <div className="flex items-center gap-4">
          <ThemeSelector />
          <Link
            href="/profile"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>View Profile</span>
          </Link>
        </div>
      </div>

      {/* Username Manager */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <UsernameManager
          currentUsername={session?.user?.name?.toLowerCase().replace(/\s+/g, '-')}
          onUsernameChange={async (username) => {
            // TODO: Implement username update in your backend
            console.log('Updating username to:', username);
          }}
        />
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {statsDisplay.map((stat) => (
          <div
            key={stat.name}
            className="bg-card border border-border rounded-lg p-6 hover:bg-accent/5 transition-colors duration-200"
          >
            <dt className="text-sm text-muted-foreground">{stat.name}</dt>
            <dd className="mt-1 text-3xl font-semibold text-foreground">
              {loading ? (
                <div className="h-8 bg-muted rounded animate-pulse" />
              ) : (
                stat.value
              )}
            </dd>
          </div>
        ))}
      </motion.div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-lg p-6"
        >
          <h2 className="text-lg font-medium text-foreground mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.name}
                href={action.href}
                className="flex items-center space-x-3 p-4 rounded-lg bg-background hover:bg-accent/5 border border-border transition-colors duration-200"
              >
                <div className="p-2 rounded-lg bg-accent/10 text-accent">
                  {action.icon}
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{action.name}</h3>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card border border-border rounded-lg p-6"
        >
          <h2 className="text-lg font-medium text-foreground mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start space-x-3 p-3 rounded-lg bg-background hover:bg-accent/5 transition-colors duration-200"
              >
                <div className="p-2 rounded-lg bg-accent/10 text-accent">
                  {activity.type === 'project' && (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  )}
                  {activity.type === 'skill' && (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  )}
                  {activity.type === 'update' && (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{activity.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
