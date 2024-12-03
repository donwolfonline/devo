import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

// Add type definition for token
interface CustomToken {
  role?: 'USER' | 'SUPER_ADMIN' | 'ADMIN';
  id?: string;
  email?: string;
  username?: string;
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Get the token and decode it
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  }) as CustomToken | null;

  console.log('Middleware Check:', {
    path,
    hasToken: !!token,
    tokenRole: token?.role,
    method: request.method,
    url: request.url
  });

  // Check if it's an API route
  if (path.startsWith('/api/')) {
    // For API routes that require authentication
    if (path.startsWith('/api/users/')) {
      if (!token) {
        console.log('API route - unauthorized');
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        );
      }

      // For superadmin-only routes
      if (path.includes('/toggle-status')) {
        if (token.role !== 'SUPER_ADMIN') {
          console.log('API route - forbidden');
          return NextResponse.json(
            { error: 'Forbidden' },
            { status: 403 }
          );
        }
      }
    }
    return NextResponse.next();
  }

  // Handle non-API routes
  if (path.startsWith('/superadmin')) {
    if (!token) {
      console.log('Superadmin route - no token');
      return NextResponse.redirect(new URL('/auth/sign-in', request.url));
    }

    if (token.role !== 'SUPER_ADMIN') {
      console.log('Superadmin route - not super admin');
      return NextResponse.redirect(new URL('/auth/sign-in', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/superadmin',
    '/superadmin/dashboard/:path*',
    '/api/users/:path*',
  ]
};
