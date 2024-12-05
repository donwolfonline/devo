import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function withAuth(Component: React.ComponentType, requiredRole?: string) {
  return function ProtectedRoute(props: any) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === 'loading') return;

      if (!session) {
        router.replace('/auth/sign-in');
        return;
      }

      if (requiredRole && session.user?.role !== requiredRole) {
        router.replace('/unauthorized');
        return;
      }
    }, [session, status, router]);

    if (status === 'loading') {
      return <div>Loading...</div>;
    }

    if (!session || (requiredRole && session.user?.role !== requiredRole)) {
      return null;
    }

    return <Component {...props} />;
  };
}
