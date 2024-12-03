import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

interface CustomToken {
  role?: 'USER' | 'SUPER_ADMIN' | 'ADMIN';
  id?: string;
  email?: string;
  username?: string;
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Only protect /superadmin/dashboard routes
  if (path.startsWith('/superadmin/dashboard')) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET
    }) as CustomToken | null;

    if (!token || token.role !== 'SUPER_ADMIN') {
      return NextResponse.redirect(new URL('/superadmin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/superadmin/dashboard/:path*']
};
