'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { 
  ChevronRight,
  ChevronLeft,
  LayoutDashboard,
  BarChart3,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
  FolderKanban
} from 'lucide-react';

const navItems = [
  { 
    name: 'Dashboard',
    href: '/superadmin/dashboard',
    icon: LayoutDashboard
  },
  {
    name: 'Analytics',
    href: '/superadmin/dashboard/analytics',
    icon: BarChart3
  },
  {
    name: 'Users',
    href: '/superadmin/dashboard/users',
    icon: Users
  },
  {
    name: 'Security Center',
    href: '/superadmin/dashboard/security',
    icon: Shield
  },
  {
    name: 'Project Overview',
    href: '/superadmin/dashboard/projects',
    icon: FolderKanban
  },
  {
    name: 'Settings',
    href: '/superadmin/dashboard/settings',
    icon: Settings
  }
];

export default function SideNav() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on path change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 left-4 z-50 rounded-full p-2 bg-purple-600 hover:bg-purple-700 text-white md:hidden transition-colors"
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-full
          transition-all duration-300 ease-in-out
          bg-[#0f0f17] border-r border-gray-800
          ${isCollapsed ? 'w-14' : 'w-56'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}
      >
        {/* Logo Section */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-800">
          <Link href="/superadmin/dashboard" className="flex items-center space-x-2">
            {!isCollapsed && (
              <>
                <span className="text-purple-500 font-bold text-xl">Admin</span>
                <span className="text-white font-bold text-xl">Panel</span>
              </>
            )}
          </Link>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:block text-gray-400 hover:text-white transition-colors"
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-2 space-y-1">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={index}
                href={item.href}
                className={`
                  flex items-center space-x-2 px-3 py-2 rounded-lg
                  transition-colors duration-200
                  ${isActive 
                    ? 'bg-purple-600 text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-[#1a1a24]'
                  }
                `}
              >
                <item.icon size={20} />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Sign Out Button */}
        <div className="absolute bottom-4 left-0 right-0 px-2">
          <button
            onClick={() => signOut()}
            className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#1a1a24] transition-colors"
          >
            <LogOut size={20} />
            {!isCollapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
