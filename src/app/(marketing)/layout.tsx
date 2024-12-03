'use client';

import { ReactNode } from 'react';
import { Providers } from '@/components/providers/Providers';
import MarketingHeader from '@/components/marketing/Header';
import { useEffect } from 'react';

export default function MarketingLayout({ 
  children 
}: { 
  children: ReactNode 
}) {
  useEffect(() => {
    console.error('Marketing Layout Mounted');
    console.error('Header Component:', MarketingHeader);
  }, []);

  return (
    <Providers>
      <div className="min-h-screen flex flex-col bg-black text-white">
        <div className="fixed top-0 left-0 right-0 z-50 bg-red-500">
          DEBUG: Header Container
          <MarketingHeader />
        </div>
        <main className="flex-grow mt-16">
          {children}
        </main>
        <div className="text-center p-4 text-red-500">
          Header Debug: Rendering Marketing Layout
        </div>
      </div>
    </Providers>
  );
}
