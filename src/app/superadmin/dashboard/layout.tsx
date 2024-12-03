'use client';

import { ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import SideNav from '@/components/superadmin/SideNav';

export default function SuperAdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { data: session, status } = useSession();

  if (status === 'unauthenticated') {
    redirect('/auth/sign-in');
  }
  if (status === 'authenticated' && session?.user?.role !== 'SUPER_ADMIN') {
    redirect('/auth/sign-in');
  }

  // Show loading state while checking session
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]">
        <div className="w-8 h-8 border-t-2 border-b-2 border-purple-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-100">
      <SideNav />
      <main className="transition-all duration-300 pl-2 md:pl-56 pt-16 md:pt-4">
        <div className="max-w-[2000px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
