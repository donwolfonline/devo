'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { usePathname } from 'next/navigation';
import SideNav from '@/components/superadmin/SideNav';

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  // Only enforce authentication for dashboard routes
  const isDashboardRoute = pathname.startsWith('/superadmin/dashboard');

  useEffect(() => {
    if (status === 'loading') return;
    
    // Skip auth check for the login page
    if (pathname === '/superadmin') return;

    if (!session || session.user?.role !== 'SUPER_ADMIN') {
      redirect('/superadmin');
    }
  }, [session, status, pathname]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  // Don't show nav for login page
  if (pathname === '/superadmin') {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen">
      {isDashboardRoute && <SideNav />}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
