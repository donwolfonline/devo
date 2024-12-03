'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconType } from 'react-icons';
import {
  FiUsers,
  FiSettings,
  FiFileText,
  FiActivity,
  FiHome,
  FiLogOut,
  FiFolder,
} from 'react-icons/fi';
import { signOut } from 'next-auth/react';

interface NavItem {
  name: string;
  href: string;
  icon: IconType;
}

const navigation: NavItem[] = [
  { name: 'Dashboard', href: '/superadmin/dashboard', icon: FiHome },
  { name: 'Users', href: '/superadmin/users', icon: FiUsers },
  { name: 'Projects', href: '/superadmin/projects', icon: FiFolder },
  { name: 'Content', href: '/superadmin/content', icon: FiFileText },
  { name: 'Activity Logs', href: '/superadmin/logs', icon: FiActivity },
  { name: 'Settings', href: '/superadmin/settings', icon: FiSettings },
];

export default function Sidebar() {
  const pathname = usePathname();

  const handleSignOut = () => {
    signOut({ callbackUrl: '/superadmin' });
  };

  return (
    <div className="flex flex-col w-64 bg-white border-r">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <h1 className="text-xl font-bold text-gray-900">Super Admin</h1>
        </div>
        <nav className="mt-8 flex-1 px-2 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
              >
                <item.icon
                  className={`${
                    isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-500'
                  } mr-3 flex-shrink-0 h-6 w-6`}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="flex-shrink-0 flex border-t p-4">
        <button
          onClick={handleSignOut}
          className="flex-shrink-0 w-full group flex items-center px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md"
        >
          <FiLogOut
            className="text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6"
            aria-hidden="true"
          />
          Sign out
        </button>
      </div>
    </div>
  );
}
