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
  BellAlertIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import AddUserModal from '@/components/superadmin/AddUserModal';

export default function SuperAdminDashboard() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login');
    }
  });

  if (status === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0a0a0f]">
        <div className="w-8 h-8 border-t-2 border-b-2 border-purple-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  const [stats, setStats] = useState({
    totalUsers: '...',
    activeUsers: '...',
    totalProjects: '...',
    systemHealth: '...'
  });

  useEffect(() => {
    if (status === 'authenticated' && session.user.role !== 'SUPER_ADMIN') {
      redirect('/superadmin');
    }
  }, [session, status]);

  useEffect(() => {
    // Simulated stats loading
    const loadStats = async () => {
      // In a real app, this would be an API call
      setTimeout(() => {
        setStats({
          totalUsers: '1,234',
          activeUsers: '892',
          totalProjects: '156',
          systemHealth: '98%'
        });
      }, 1000);
    };
    loadStats();
  }, []);

  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddUser = async (userData: {
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

      // Close the modal and optionally refresh the user list
      setIsAddUserModalOpen(false);
      // You might want to refresh your user stats here
    } catch (error) {
      console.error('Error creating user:', error);
      setError(error instanceof Error ? error.message : 'Failed to create user');
    }
  };

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

  const recentAlerts = [
    { id: 1, message: 'New user registration spike detected', time: '2 minutes ago', type: 'info' },
    { id: 2, message: 'System backup completed successfully', time: '1 hour ago', type: 'success' },
    { id: 3, message: 'Server load approaching threshold', time: '3 hours ago', type: 'warning' }
  ];

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl md:text-3xl font-semibold text-purple-400 leading-tight">Dashboard Overview</h1>
        <p className="text-gray-400 text-sm md:text-base">Welcome back to your admin dashboard</p>
      </div>

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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button 
              onClick={() => setIsAddUserModalOpen(true)}
              className="p-3 md:p-4 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors text-sm md:text-base"
            >
              Add New User
            </button>
            <button className="p-3 md:p-4 rounded-lg bg-[#1f1f2d] hover:bg-[#25252f] text-white font-medium border border-gray-800 transition-colors text-sm md:text-base">
              System Backup
            </button>
          </div>
        </div>
      </div>

      <AddUserModal 
        isOpen={isAddUserModalOpen} 
        onClose={() => setIsAddUserModalOpen(false)}
        onSubmit={handleAddUser}
        error={error}
      />
    </div>
  );
}
