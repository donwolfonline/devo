'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    if (!username || !password) {
      setError('Username and password are required');
      setIsLoading(false);
      return;
    }

    try {
      console.log('Attempting sign in with:', { username });
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        console.error('Sign in error:', result.error);
        setError(result.error === 'Invalid credentials' ? 
          'Invalid username or password' : 
          'An error occurred during sign in'
        );
      } else if (result?.ok) {
        toast({
          title: 'Success',
          description: 'Signed in successfully',
        });
        
        // For admin users, redirect to the admin dashboard
        if (username.toLowerCase() === 'admin' || username.toLowerCase() === 'admin@devoapp.com') {
          router.push('/superadmin/dashboard');
        } else {
          router.push('/dashboard');
        }
        router.refresh();
      }
    } catch (error) {
      console.error('Sign in error:', error);
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full bg-[#1a1a1f] border-[#2a2a2f]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-[#9333EA]">Sign in</CardTitle>
        <CardDescription className="text-gray-400">
          Enter your super admin credentials
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-sm font-medium text-gray-300">
              Username
            </Label>
            <Input
              id="username"
              name="username"
              type="text"
              required
              className="w-full bg-[#2a2a2f] border-[#3a3a3f] text-white placeholder:text-gray-500 focus:border-[#9333EA] focus:ring-[#9333EA]"
              placeholder="Enter your username"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-300">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              className="w-full bg-[#2a2a2f] border-[#3a3a3f] text-white placeholder:text-gray-500 focus:border-[#9333EA] focus:ring-[#9333EA]"
              placeholder="Enter your password"
            />
          </div>
          {error && (
            <div className="text-red-500">{error}</div>
          )}
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full bg-[#9333EA] hover:bg-[#7928CA] text-white font-medium"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
