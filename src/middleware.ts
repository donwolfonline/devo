import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { prisma } from './lib/prisma';

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const subdomain = hostname.split('.')[0];

  // Check if the request is for a subdomain (excluding www and the main domain)
  const subdomainRegex = /^[a-zA-Z0-9-]+$/;
  if (
    subdomainRegex.test(subdomain) && 
    subdomain !== 'www' && 
    !['localhost', 'devshowcase'].includes(subdomain)
  ) {
    try {
      // Verify if the subdomain matches a valid username
      const user = await prisma.user.findFirst({
        where: { 
          OR: [
            { username: subdomain },
            { email: `${subdomain}@example.com` }
          ]
        },
        select: { username: true }
      });

      if (user) {
        // Rewrite the request to the dynamic username route
        return NextResponse.rewrite(
          new URL(`/${user.username}`, request.url)
        );
      }
    } catch (error) {
      console.error('Subdomain lookup error:', error);
    }
  }

  // Continue with normal routing
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all routes except static files and API routes
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
