'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Navbar from '@/components/Navbar';
import DashboardClient from './DashboardClient';

export default function Dashboard() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/auth/sign-in');
    }
  });

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="w-8 h-8 border-t-2 border-b-2 border-purple-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      <Navbar />
      <div className="max-w-[2000px] mx-auto">
        <div className="p-4 md:p-6 space-y-6">
          <div className="flex flex-col space-y-1">
            <h1 className="text-2xl md:text-3xl font-semibold text-purple-400 leading-tight">
              Welcome, {session?.user?.name || 'Developer'}
            </h1>
            <p className="text-gray-400 text-sm md:text-base">
              Manage your portfolio and projects
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Portfolio Card */}
            <div className="p-4 md:p-6 rounded-lg bg-[#1a1a24] hover:bg-[#1f1f2d] transition-colors border border-gray-800">
              <div className="flex flex-col space-y-2">
                <h3 className="font-semibold text-white text-sm md:text-base">Your Portfolio</h3>
                <p className="text-sm text-gray-400">Manage and customize your professional portfolio</p>
                <button className="mt-4 w-full p-3 md:p-4 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors text-sm md:text-base">
                  Edit Portfolio
                </button>
              </div>
            </div>

            {/* Projects Card */}
            <div className="p-4 md:p-6 rounded-lg bg-[#1a1a24] hover:bg-[#1f1f2d] transition-colors border border-gray-800">
              <div className="flex flex-col space-y-2">
                <h3 className="font-semibold text-white text-sm md:text-base">Projects</h3>
                <p className="text-sm text-gray-400">Showcase your best work and achievements</p>
                <button className="mt-4 w-full p-3 md:p-4 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors text-sm md:text-base">
                  Manage Projects
                </button>
              </div>
            </div>

            {/* Settings Card */}
            <div className="p-4 md:p-6 rounded-lg bg-[#1a1a24] hover:bg-[#1f1f2d] transition-colors border border-gray-800">
              <div className="flex flex-col space-y-2">
                <h3 className="font-semibold text-white text-sm md:text-base">Account Settings</h3>
                <p className="text-sm text-gray-400">Update your profile and preferences</p>
                <button className="mt-4 w-full p-3 md:p-4 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors text-sm md:text-base">
                  Edit Settings
                </button>
              </div>
            </div>
          </div>

          {/* Dashboard Client Component */}
          <DashboardClient user={session?.user || {}} />
        </div>
      </div>
    </main>
  );
}
