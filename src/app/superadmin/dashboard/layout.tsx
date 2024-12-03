'use client';

import { ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function SuperAdminDashboardLayout({ 
  children 
}: { 
  children: ReactNode 
}) {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/auth/sign-in');
    },
  });

  // Show loading state while checking session
  if (status === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center bg-black">
        <div className="w-8 h-8 border-t-2 border-b-2 border-purple-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Redirect if not a super admin
  if (session?.user?.role !== 'SUPER_ADMIN') {
    redirect('/auth/sign-in');
  }

  return (
    <div className="p-1">
      {children}
    </div>
  );
}
