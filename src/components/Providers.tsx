'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { Session } from 'next-auth';

export default function Providers({ 
  children, 
  session 
}: { 
  children: React.ReactNode, 
  session: Session | null 
}) {
  return (
    <SessionProvider 
      session={session} 
      refetchInterval={5 * 60}  // Refetch session every 5 minutes
      refetchOnWindowFocus={true}
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}
