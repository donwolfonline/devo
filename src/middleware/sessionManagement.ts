import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import SessionManagement from '@/models/SessionManagement';
import { connectDB } from '@/lib/mongodb';

export async function sessionMiddleware(request: NextRequest) {
  try {
    // Skip middleware for next-auth routes and public assets
    if (
      request.nextUrl.pathname.startsWith('/_next') ||
      request.nextUrl.pathname.startsWith('/api/auth') ||
      request.nextUrl.pathname.startsWith('/public')
    ) {
      return NextResponse.next();
    }

    const token = await getToken({ req: request });
    if (!token) {
      return NextResponse.next();
    }

    await connectDB();
    
    // Get session management settings for user
    const sessionManagement = await SessionManagement.findOne({ 
      userId: token.sub 
    });

    if (!sessionManagement) {
      return NextResponse.next();
    }

    const currentSessionToken = request.cookies.get('next-auth.session-token')?.value;
    
    // Check auto logout (session timeout)
    if (sessionManagement.settings.autoLogoutEnabled) {
      const session = sessionManagement.sessions.find(
        s => s.sessionToken === currentSessionToken
      );
      
      if (session) {
        const timeoutMinutes = sessionManagement.settings.autoLogoutTimeMinutes;
        const lastActivity = new Date(session.lastActivity);
        const timeDiff = (Date.now() - lastActivity.getTime()) / 1000 / 60; // in minutes
        
        if (timeDiff > timeoutMinutes) {
          // Session expired, clear cookies and redirect to login
          const response = NextResponse.redirect(new URL('/api/auth/signout', request.url));
          response.cookies.delete('next-auth.session-token');
          response.cookies.delete('next-auth.callback-url');
          response.cookies.delete('next-auth.csrf-token');
          return response;
        }

        // Update last activity
        session.lastActivity = new Date();
        await sessionManagement.save();
      }
    }

    // Check multiple sessions
    if (!sessionManagement.settings.multipleSessions) {
      const activeSessions = sessionManagement.sessions.length;
      if (activeSessions > sessionManagement.settings.maxConcurrentSessions) {
        // Remove oldest sessions until we're at the limit
        const sortedSessions = [...sessionManagement.sessions].sort(
          (a, b) => a.lastActivity.getTime() - b.lastActivity.getTime()
        );
        
        const sessionsToRemove = sortedSessions.slice(
          0, 
          activeSessions - sessionManagement.settings.maxConcurrentSessions
        );

        if (sessionsToRemove.some(s => s.sessionToken === currentSessionToken)) {
          const response = NextResponse.redirect(new URL('/api/auth/signout', request.url));
          response.cookies.delete('next-auth.session-token');
          response.cookies.delete('next-auth.callback-url');
          response.cookies.delete('next-auth.csrf-token');
          return response;
        }

        sessionManagement.sessions = sessionManagement.sessions.filter(
          s => !sessionsToRemove.some(r => r.sessionToken === s.sessionToken)
        );
        await sessionManagement.save();
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Session middleware error:', error);
    return NextResponse.next();
  }
}
