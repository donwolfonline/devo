import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { logAPIRequest, logAPIResponse, logAPIError } from '@/lib/api-logger';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const endpoint = `/api/analytics/${params.id}`;
  logAPIRequest(endpoint, 'POST', { profileId: params.id });

  try {
    const profileId = params.id;
    const timestamp = new Date().toISOString();

    const result = await prisma.analytics.update({
      where: { profileId },
      data: {
        totalViews: {
          increment: 1,
        },
        viewsOverTime: {
          push: {
            date: timestamp,
            views: 1,
          },
        },
      },
    });

    logAPIResponse(endpoint, 'POST', 200, {
      profileId,
      timestamp,
      totalViews: result.totalViews,
    });

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    logAPIError(endpoint, 'POST', error);
    console.error('Error updating analytics:', error);
    return new NextResponse(null, { status: 500 });
  }
}
