'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function DefaultUsernamePage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    return null;
  }

  return (
    <div className="py-4">
      <p className="text-sm text-muted-foreground">
        Logged in as {session.user.name || session.user.email}
      </p>
    </div>
  );
}
