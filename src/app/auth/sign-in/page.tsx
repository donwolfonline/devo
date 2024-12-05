'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { SpaceBackground } from '@/components/SpaceBackground';
import { MouseFollower, FloatingDots } from '@/components/BackgroundElements';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      console.log('Attempting login with:', { username });
      const result = await signIn('credentials', {
        username: username.toLowerCase(),
        password,
        type: 'user',
        redirect: false,
        callbackUrl
      });

      console.log('Login result:', result);

      if (result?.error) {
        setError('Invalid credentials');
      } else if (result?.ok) {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-black via-purple-950/5 to-black">
      <SpaceBackground />
      <main className="flex min-h-screen flex-col relative overflow-hidden">
        <MouseFollower />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <FloatingDots />
        </div>

        {/* Background gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/20 via-black to-purple-950/20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-tl from-purple-900/10 via-transparent to-transparent pointer-events-none mix-blend-screen" />
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-800/5 via-transparent to-transparent pointer-events-none mix-blend-screen" />

        {/* Center content */}
        <div className="flex-1 flex items-center justify-center w-full p-4">
          <div className="w-full max-w-md">
            <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">
                Welcome Back
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-500/20 border border-red-500 text-red-300 p-4 rounded-lg">
                    {error}
                  </div>
                )}
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-300/90 mb-2">
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength={3}
                    maxLength={20}
                    pattern="^[a-zA-Z0-9_]+$"
                    title="Username must be 3-20 characters, containing only letters, numbers, and underscores"
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-purple-500/20 text-white placeholder-gray-400
                             focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-transparent
                             transition-colors"
                    placeholder="Enter your username"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300/90 mb-2">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-purple-500/20 text-white placeholder-gray-400
                             focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-transparent
                             transition-colors"
                    placeholder="Enter your password"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-purple-900/90 to-purple-800/90 text-white font-medium
                             hover:from-purple-800/90 hover:to-purple-700/90 transition-all duration-200
                             focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-black"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      'Sign In'
                    )}
                  </button>
                </div>
                <div className="mt-6 text-center text-sm text-gray-300/80">
                  Don't have an account?{' '}
                  <Link href="/auth/sign-up" className="text-purple-400 hover:text-purple-300 transition-colors">
                    Sign up here
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
