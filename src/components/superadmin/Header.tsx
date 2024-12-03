'use client';

import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ArrowRightStartOnRectangleIcon,
  ChartBarIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  HomeIcon
} from '@heroicons/react/24/outline';

export default function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const handleSignOut = () => {
    signOut({ callbackUrl: '/superadmin' });
  };

  if (!session) return null;

  const navigation = [
    { name: 'Dashboard', href: '/superadmin/dashboard', icon: HomeIcon },
    { name: 'Analytics', href: '/superadmin/dashboard/analytics', icon: ChartBarIcon },
    { name: 'Users', href: '/superadmin/dashboard/users', icon: UserGroupIcon },
    { name: 'Settings', href: '/superadmin/dashboard/settings', icon: Cog6ToothIcon },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/95 border-b border-purple-500/10 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-8">
            <Link href="/superadmin/dashboard" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-purple-400">DevoApp</span>
            </Link>

            <nav className="hidden md:flex space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-purple-500/10 text-purple-400'
                        : 'text-gray-400 hover:text-purple-400 hover:bg-purple-500/5'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-2" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-400">
              {session.user.name || session.user.username}
            </span>
            <button
              onClick={handleSignOut}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-400 hover:text-purple-400 hover:bg-purple-500/5 rounded-md transition-colors"
            >
              <ArrowRightStartOnRectangleIcon className="w-5 h-5 mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
