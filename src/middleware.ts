import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';
import { withAuth } from 'next-auth/middleware';
import { connectDB } from '@/lib/mongodb';
import mongoose from 'mongoose';
import SessionManagement from '@/models/SessionManagement';
import { AnalyticsService } from '@/lib/analytics';
import { prisma } from '@/lib/prisma';

interface CustomToken {
  role?: 'USER' | 'SUPER_ADMIN' | 'ADMIN';
  id?: string;
  email?: string;
  username?: string;
}

// Initialize database connection
let isConnected = false;

const initDB = async () => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
};

async function trackAnalytics(request: NextRequest, token: CustomToken | null) {
  try {
    const path = request.nextUrl.pathname;
    const referrer = request.headers.get('referer') || undefined;
    const userId = token?.id || null;

    // Skip tracking for assets and API routes
    if (
      path.startsWith('/_next') ||
      path.startsWith('/api/') ||
      path.startsWith('/public/')
    ) {
      return;
    }

    // Get or create session
    let sessionId = request.cookies.get('analytics_session')?.value;
    
    if (!sessionId && userId) {
      const session = await prisma.userSession.create({
        data: {
          userId,
          deviceInfo: JSON.stringify({
            userAgent: request.headers.get('user-agent'),
            platform: request.headers.get('sec-ch-ua-platform'),
          }),
          ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
          userAgent: request.headers.get('user-agent'),
        }
      });
      sessionId = session.id;
    }

    // Track page view
    await prisma.pageView.create({
      data: {
        userId,
        sessionId,
        path,
        referrer,
      }
    });

    // Track traffic source for new sessions
    if (referrer && sessionId) {
      const url = new URL(referrer);
      const source = url.hostname === request.headers.get('host') 
        ? 'direct'
        : url.hostname;
      
      await prisma.trafficSource.create({
        data: {
          sessionId,
          source,
          medium: 'referral',
        }
      });
    }

    // Update session activity
    if (sessionId) {
      await prisma.userSession.update({
        where: { id: sessionId },
        data: { lastActivity: new Date() }
      });
    }
  } catch (error) {
    console.error('Analytics tracking error:', error);
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Public routes that don't require authentication
  const publicRoutes = [
    '/auth/sign-in',
    '/auth/sign-up',
    '/auth/forgot-password',
    '/api/setup',
    '/api/setup/reset',
    '/api/setup/test',
    '/superadmin',
    '/_next',
    '/api/auth',
    '/favicon.ico'
  ];

  // Check if it's a public route
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Get the token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });

  // If there's no token and this isn't a public route, redirect to sign in
  if (!token) {
    const signInUrl = new URL('/auth/sign-in', request.url);
    signInUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(signInUrl);
  }

  // Handle superadmin routes
  if (pathname.startsWith('/superadmin')) {
    if (token.role !== 'SUPER_ADMIN') {
      // If not a superadmin, redirect to regular sign in
      return NextResponse.redirect(new URL('/auth/sign-in', request.url));
    }
  }

  // Handle regular dashboard routes
  if (pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/auth/sign-in', request.url));
    }
  }

  // Handle API routes
  if (pathname.startsWith('/api') && !pathname.startsWith('/api/auth')) {
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  // Track analytics asynchronously
  trackAnalytics(request, token).catch(console.error);

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all API routes
    '/api/:path*',
    // Match all authenticated pages
    '/dashboard/:path*',
    // Match all superadmin pages
    '/superadmin/:path*',
    // Match auth pages
    '/auth/:path*'
  ]
};
