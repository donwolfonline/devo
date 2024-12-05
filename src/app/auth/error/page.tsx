'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AuthError({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const router = useRouter();
  const error = searchParams?.error || 'An error occurred';

  useEffect(() => {
    // Automatically redirect after 5 seconds
    const timeout = setTimeout(() => {
      router.push('/auth/signin');
    }, 5000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Authentication Error</CardTitle>
          <CardDescription>
            {error}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            You will be redirected to the sign-in page in 5 seconds...
          </p>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={() => router.push('/auth/signin')}
          >
            Back to Sign In
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
