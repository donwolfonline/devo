import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { logAPIRequest, logAPIResponse, logAPIError } from '@/lib/api-logger';

export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  const endpoint = `/api/profile/${params.username}`;
  logAPIRequest(endpoint, 'GET');

  try {
    const username = params.username;
    logAPIRequest(endpoint, 'GET', { username });

    const profile = await prisma.linkBioProfile.findUnique({
      where: { username },
      include: {
        socialLinks: true,
        customLinks: {
          orderBy: {
            order: 'asc',
          },
        },
        analytics: true,
      },
    });

    if (!profile) {
      logAPIResponse(endpoint, 'GET', 404);
      return new NextResponse(null, { status: 404 });
    }

    logAPIResponse(endpoint, 'GET', 200, { 
      id: profile.id,
      username: profile.username,
      socialLinksCount: profile.socialLinks.length,
      customLinksCount: profile.customLinks.length,
    });

    return NextResponse.json(profile);
  } catch (error) {
    logAPIError(endpoint, 'GET', error);
    console.error('Error fetching profile:', error);
    return new NextResponse(null, { status: 500 });
  }
}
