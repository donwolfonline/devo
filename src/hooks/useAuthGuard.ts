'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface UseAuthGuardOptions {
  role?: 'USER' | 'SUPER_ADMIN';
  redirectTo?: string;
}

export function useAuthGuard(options: UseAuthGuardOptions = {}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { role, redirectTo = '/auth/sign-in' } = options;

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      router.push(redirectTo);
      return;
    }

    if (role && session.user?.role !== role) {
      router.push(redirectTo);
      return;
    }
  }, [session, status, router, role, redirectTo]);

  return {
    session,
    status,
    isAuthorized: session && (!role || session.user?.role === role),
    isLoading: status === 'loading'
  };
}
