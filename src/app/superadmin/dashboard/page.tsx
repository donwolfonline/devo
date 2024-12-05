'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { 
  UserGroupIcon, 
  Cog6ToothIcon, 
  ChartBarIcon, 
  ShieldCheckIcon,
  ServerIcon,
  BellAlertIcon,
  ArrowPathIcon,
  DocumentTextIcon,
  MegaphoneIcon,
  CloudArrowUpIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import AddUserModal from '@/components/superadmin/AddUserModal';
import BackupModal from '@/components/modals/BackupModal';
import AnnouncementModal from '@/components/modals/AnnouncementModal';

export default function SuperAdminDashboard() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/auth/sign-in?callbackUrl=/superadmin/dashboard');
    }
  });

  const [stats, setStats] = useState({
    totalUsers: '...',
    activeUsers: '...',
    totalProjects: '...',
    systemHealth: '...'
  });

  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isBackupModalOpen, setIsBackupModalOpen] = useState(false);
  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (actionSuccess) {
      const timer = setTimeout(() => setActionSuccess(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [actionSuccess]);

  // Load dashboard stats
  useEffect(() => {
    const loadStats = async () => {
      try {
        const [analyticsResponse, usersResponse] = await Promise.allSettled([
          fetch('/api/superadmin/analytics?timeRange=24h'),
          fetch('/api/users/stats')
        ]);

        let analyticsData = null;
        let usersData = null;

        if (analyticsResponse.status === 'fulfilled' && analyticsResponse.value.ok) {
          analyticsData = await analyticsResponse.value.json();
        }

        if (usersResponse.status === 'fulfilled' && usersResponse.value.ok) {
          usersData = await usersResponse.value.json();
        }

        setStats({
          totalUsers: usersData?.totalUsers?.toLocaleString() || '...',
          activeUsers: analyticsData?.activeSessions?.toLocaleString() || usersData?.activeUsers?.toLocaleString() || '...',
          totalProjects: usersData?.totalProjects?.toLocaleString() || '...',
          systemHealth: `${analyticsData?.systemHealth || 98}%`
        });
      } catch (error) {
        console.error('Error loading dashboard stats:', error);
      }
    };
    loadStats();
  }, []);

  const handleAddUser = async (userData: {
    username: string;
    email: string;
    name: string;
    role: string;
    password: string;
  }) => {
    try {
      setError(null);
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create user');
      }

      setIsAddUserModalOpen(false);
      setActionSuccess('User created successfully');
    } catch (error) {
      console.error('Error creating user:', error);
      setError(error instanceof Error ? error.message : 'Failed to create user');
    }
  };

  const handleClearCache = async () => {
    try {
      setActionLoading('cache');
      setError(null);
      
      const response = await fetch('/api/system/cache', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to clear cache');
      }

      setActionSuccess('Cache cleared successfully');
    } catch (error) {
      console.error('Error clearing cache:', error);
      setError(error instanceof Error ? error.message : 'Failed to clear cache');
    } finally {
      setActionLoading(null);
    }
  };

  const handleSecurityScan = async () => {
    try {
      setActionLoading('security');
      setError(null);
      
      const response = await fetch('/api/system/security/scan', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to initiate security scan');
      }

      setActionSuccess('Security scan initiated');
    } catch (error) {
      console.error('Error initiating security scan:', error);
      setError(error instanceof Error ? error.message : 'Failed to initiate security scan');
    } finally {
      setActionLoading(null);
    }
  };

  const handleGenerateReport = async () => {
    try {
      setActionLoading('report');
      setError(null);
      
      const response = await fetch('/api/reports/generate', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to generate report');
      }

      // Trigger download if report was generated successfully
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'system-report.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      setActionSuccess('Report generated successfully');
    } catch (error) {
      console.error('Error generating report:', error);
      setError(error instanceof Error ? error.message : 'Failed to generate report');
    } finally {
      setActionLoading(null);
    }
  };

  const handleCheckUpdates = async () => {
    try {
      setActionLoading('updates');
      setError(null);
      
      const response = await fetch('/api/system/updates/check', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to check for updates');
      }

      const data = await response.json();
      setActionSuccess(data.updates ? 'Updates available!' : 'System is up to date');
    } catch (error) {
      console.error('Error checking updates:', error);
      setError(error instanceof Error ? error.message : 'Failed to check for updates');
    } finally {
      setActionLoading(null);
    }
  };

  const quickActions = [
    {
      name: 'Add User',
      icon: UserGroupIcon,
      onClick: () => setIsAddUserModalOpen(true),
      loading: false,
    },
    {
      name: 'System Backup',
      icon: CloudArrowUpIcon,
      onClick: () => setIsBackupModalOpen(true),
      loading: false,
    },
    {
      name: 'Clear Cache',
      icon: ArrowPathIcon,
      onClick: handleClearCache,
      loading: actionLoading === 'cache',
    },
    {
      name: 'Security Scan',
      icon: ShieldCheckIcon,
      onClick: handleSecurityScan,
      loading: actionLoading === 'security',
    },
    {
      name: 'Generate Report',
      icon: DocumentTextIcon,
      onClick: handleGenerateReport,
      loading: actionLoading === 'report',
    },
    {
      name: 'Send Announcement',
      icon: MegaphoneIcon,
      onClick: () => setIsAnnouncementModalOpen(true),
      loading: false,
    },
  ];

  const recentAlerts = [
    { id: 1, message: 'New user registration spike detected', time: '2 minutes ago', type: 'info' },
    { id: 2, message: 'System backup completed successfully', time: '1 hour ago', type: 'success' },
    { id: 3, message: 'Server load approaching threshold', time: '3 hours ago', type: 'warning' }
  ];

  const cards = [
    {
      title: 'User Management',
      description: 'View and manage user accounts across the platform.',
      icon: UserGroupIcon,
      stats: stats.totalUsers + ' Total Users',
      link: '/superadmin/dashboard/users',
      color: 'from-purple-500/20 to-blue-500/20'
    },
    {
      title: 'System Analytics',
      description: 'Monitor system performance and user activity.',
      icon: ChartBarIcon,
      stats: stats.activeUsers + ' Active Users',
      link: '/superadmin/dashboard/analytics',
      color: 'from-green-500/20 to-emerald-500/20'
    },
    {
      title: 'Security Center',
      description: 'Manage security settings and view audit logs.',
      icon: ShieldCheckIcon,
      stats: 'System Health: ' + stats.systemHealth,
      link: '/superadmin/dashboard/security',
      color: 'from-red-500/20 to-orange-500/20'
    },
    {
      title: 'Project Overview',
      description: 'Monitor and manage all active projects.',
      icon: ServerIcon,
      stats: stats.totalProjects + ' Active Projects',
      link: '/superadmin/dashboard/projects',
      color: 'from-blue-500/20 to-cyan-500/20'
    }
  ];

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl md:text-3xl font-semibold text-purple-400 leading-tight">Dashboard Overview</h1>
        <p className="text-gray-400 text-sm md:text-base">Welcome back to your admin dashboard</p>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
          {error}
        </div>
      )}

      {actionSuccess && (
        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400">
          {actionSuccess}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <Link 
            key={index} 
            href={card.link}
            className="p-4 md:p-6 rounded-lg bg-[#1a1a24] hover:bg-[#1f1f2d] transition-colors border border-gray-800"
          >
            <div className="flex flex-col space-y-2">
              <div className="flex items-center gap-2">
                <card.icon className="h-5 w-5 md:h-6 md:w-6 text-purple-500 flex-shrink-0" />
                <h3 className="font-semibold text-white text-sm md:text-base">{card.title}</h3>
              </div>
              <p className="text-sm text-gray-400">{card.description}</p>
              <p className="text-lg font-semibold text-purple-400">{card.stats}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Alerts */}
        <div className="bg-[#1a1a24] border border-gray-800 rounded-lg p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <BellAlertIcon className="h-5 w-5 text-purple-500 flex-shrink-0" />
            Recent Alerts
          </h2>
          <div className="space-y-4">
            {recentAlerts.map((alert) => (
              <div 
                key={alert.id} 
                className="p-3 md:p-4 rounded-lg bg-[#1f1f2d] border border-gray-800"
              >
                <div className="flex justify-between items-start gap-4">
                  <p className="text-gray-300 text-sm md:text-base">{alert.message}</p>
                  <span className="text-xs md:text-sm text-gray-500 whitespace-nowrap">{alert.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-[#1a1a24] border border-gray-800 rounded-lg p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Cog6ToothIcon className="h-5 w-5 text-purple-500 flex-shrink-0" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {quickActions.map((action) => (
              <button
                key={action.name}
                onClick={action.onClick}
                disabled={action.loading}
                className="p-3 md:p-4 rounded-lg bg-[#1f1f2d] hover:bg-[#25252f] text-white font-medium border border-gray-800 transition-colors text-sm md:text-base flex flex-col items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {action.loading ? (
                  <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <action.icon className="w-5 h-5 text-purple-400" />
                )}
                {action.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddUserModal 
        isOpen={isAddUserModalOpen} 
        onClose={() => setIsAddUserModalOpen(false)}
        onSubmit={handleAddUser}
        error={error}
      />
      <BackupModal
        isOpen={isBackupModalOpen}
        onClose={() => setIsBackupModalOpen(false)}
      />
      <AnnouncementModal
        isOpen={isAnnouncementModalOpen}
        onClose={() => setIsAnnouncementModalOpen(false)}
      />
    </div>
  );
}
