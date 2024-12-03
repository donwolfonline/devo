'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  HomeIcon,
  UsersIcon,
  Cog6ToothIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const sidebarItems = [
  { 
    name: 'Dashboard', 
    href: '/superadmin/dashboard', 
    icon: HomeIcon
  },
  { 
    name: 'User Management', 
    href: '/superadmin/dashboard/users', 
    icon: UsersIcon
  },
  { 
    name: 'System Settings', 
    href: '/superadmin/dashboard/settings', 
    icon: Cog6ToothIcon
  },
  { 
    name: 'Analytics', 
    href: '/superadmin/dashboard/analytics', 
    icon: ChartBarIcon
  }
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-gray-900 text-white">
      <div className="flex flex-col h-full">
        <div className="flex flex-col items-center pt-8 pb-6">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-purple-500">Admin</span>
            <span className="text-2xl font-bold text-white">Panel</span>
          </div>
          <div className="mt-4 px-4 py-2 bg-gray-800 rounded-lg">
            <h2 className="text-sm font-medium text-gray-400">Admin Panel</h2>
          </div>
        </div>
        <nav className="flex-1 py-6">
          <ul className="space-y-1 px-3">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link 
                    href={item.href} 
                    className={`
                      flex items-center px-4 py-3 rounded-lg transition-colors duration-200
                      ${pathname === item.href 
                        ? 'bg-purple-600 text-white' 
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'}
                    `}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
