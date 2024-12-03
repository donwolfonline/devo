'use client';

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import { ReactNode } from 'react';

interface SessionProviderProps {
  children: ReactNode;
  initialSession?: Session | null;
}

export default function SessionProvider({ 
  children, 
  initialSession 
}: SessionProviderProps) {
  return (
    <NextAuthSessionProvider session={initialSession}>
      {children}
    </NextAuthSessionProvider>
  );
}
