'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function DashboardNav() {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
      <Link href="/dashboard" className="text-xl font-bold text-accent">
        DevShowcase
      </Link>

      <div className="flex items-center gap-4">
        {session?.user && (
          <div className="flex items-center gap-2">
            {session.user.image ? (
              <div className="relative w-8 h-8 rounded-full overflow-hidden">
                <Image
                  src={session.user.image}
                  alt={session.user.name || 'User avatar'}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                <span className="text-sm font-medium text-accent">
                  {session.user.name?.[0] || session.user.email?.[0] || '?'}
                </span>
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-sm font-medium">
                {session.user.name || session.user.email}
              </span>
              <span className="text-xs text-muted">Developer</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
