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
  return children;
}
