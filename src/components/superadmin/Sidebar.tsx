import Link from 'next/link';
import { 
  HomeIcon, 
  UsersIcon, 
  CogIcon, 
  DocumentTextIcon, 
  ChartBarIcon 
} from '@heroicons/react/24/outline';

export default function Sidebar() {
  const menuItems = [
    { 
      name: 'Dashboard', 
      href: '/superadmin/dashboard', 
      icon: HomeIcon 
    },
    { 
      name: 'Users', 
      href: '/superadmin/users', 
      icon: UsersIcon 
    },
    { 
      name: 'Analytics', 
      href: '/superadmin/analytics', 
      icon: ChartBarIcon 
    },
    { 
      name: 'Logs', 
      href: '/superadmin/logs', 
      icon: DocumentTextIcon 
    },
    { 
      name: 'Settings', 
      href: '/superadmin/settings', 
      icon: CogIcon 
    }
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white h-full fixed left-0 top-0 bottom-0 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-purple-500">Devo</span>
            <span className="text-2xl font-bold text-white">Showcase</span>
          </div>
        </div>
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-300">Admin Panel</h3>
        </div>
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link 
                  href={item.href} 
                  className="flex items-center p-3 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <item.icon className="w-6 h-6 mr-3" />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
