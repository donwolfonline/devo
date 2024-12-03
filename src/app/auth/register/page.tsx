'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Trim inputs to remove any accidental whitespace
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    try {
      // Register the user
      const registerResponse = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          username: trimmedUsername, 
          email: trimmedEmail, 
          password: trimmedPassword, 
          name: (name || trimmedUsername).trim()
        }),
      });

      console.log('📝 Registration Request:', {
        username: trimmedUsername,
        email: trimmedEmail,
        name: (name || trimmedUsername).trim()
      });

      console.log('Registration Response:', {
        status: registerResponse.status,
        headers: Object.fromEntries(registerResponse.headers.entries())
      });

      // Log raw response text for debugging
      const responseText = await registerResponse.text();
      console.log('Raw Response Text:', responseText);

      // Parse the response text as JSON
      let registerData;
      try {
        registerData = JSON.parse(responseText);
      } catch (parseError) {
        console.error('❌ Response Parsing Error:', parseError);
        console.error('Unparseable Response Text:', responseText);
        
        throw new Error(`Failed to parse server response. Status: ${registerResponse.status}`);
      }

      console.log('Parsed Registration Response:', registerData);

      if (!registerResponse.ok) {
        // More detailed error handling
        let errorMessage = registerData.error || 'Registration failed';
        
        // If details is an array of validation errors
        if (Array.isArray(registerData.details)) {
          errorMessage = registerData.details
            .map(err => `${err.path}: ${err.message}`)
            .join(', ');
        } 
        // If details is an object with boolean flags
        else if (typeof registerData.details === 'object') {
          if (registerData.details.existingUsername) {
            errorMessage = 'This username is already taken';
          }
          if (registerData.details.existingEmail) {
            errorMessage = 'This email is already registered';
          }
        }

        throw new Error(errorMessage);
      }

      // Attempt sign-in with multiple strategies
      const signInAttempts = [
        // First attempt with username
        async () => {
          console.log('🔐 Attempting Sign-In with Username');
          console.log('Sign-In Credentials:', {
            username: trimmedUsername,
            password: trimmedPassword
          });

          const response = await signIn('credentials', {
            username: trimmedUsername,
            password: trimmedPassword,
            redirect: false,
            callbackUrl: '/dashboard'
          });

          console.log('Sign-In Response (Username):', response);
          
          if (response?.error) {
            console.error('Sign-In Error (Username):', response.error);
            console.error('Full Sign-In Response:', JSON.stringify(response, null, 2));
            throw new Error(response.error);
          }

          return response;
        },
        // Fallback attempt with email
        async () => {
          console.log('🔐 Attempting Sign-In with Email');
          console.log('Sign-In Credentials:', {
            username: trimmedEmail,
            password: trimmedPassword
          });

          const response = await signIn('credentials', {
            username: trimmedEmail,
            password: trimmedPassword,
            redirect: false,
            callbackUrl: '/dashboard'
          });

          console.log('Sign-In Response (Email):', response);
          
          if (response?.error) {
            console.error('Sign-In Error (Email):', response.error);
            console.error('Full Sign-In Response:', JSON.stringify(response, null, 2));
            throw new Error(response.error);
          }

          return response;
        }
      ];

      // Try sign-in methods sequentially
      let signInResponse;
      for (const attempt of signInAttempts) {
        try {
          signInResponse = await attempt();
          if (signInResponse && !signInResponse.error) break;
        } catch (signInError) {
          console.error('Sign-In Attempt Failed:', signInError);
          console.error('Full Sign-In Error:', JSON.stringify(signInError, null, 2));
          continue;
        }
      }

      // If all sign-in attempts fail
      if (!signInResponse || signInResponse.error) {
        console.error('🚨 All Sign-In Attempts Failed:', signInResponse);
        throw new Error('Failed to sign in after registration. Please try logging in manually.');
      }

      // Redirect to dashboard
      router.push('/dashboard');
      router.refresh();

    } catch (err) {
      console.error('Registration Error:', err);
      
      // More user-friendly error handling
      if (err instanceof Error) {
        console.error('Full Error Details:', {
          message: err.message,
          stack: err.stack
        });
        
        // Set a more descriptive error message
        setError(err.message || 'Registration failed. Please try again.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Choose a unique username"
                className="mb-2"
              />
            </div>
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="mb-2"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Strong password"
                className="mb-2"
              />
            </div>
            <div>
              <Label htmlFor="name">Display Name (Optional)</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your display name"
                className="mb-2"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Registering...' : 'Register'}
            </Button>
          </div>
        </form>

        <div className="text-center">
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/auth/sign-in" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
