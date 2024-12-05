import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { AnalyticsService } from '@/lib/analytics';

export async function GET(request: NextRequest) {
  try {
    // Check if user is authenticated as SUPER_ADMIN
    const session = await getServerSession(authOptions);
    console.log('Session:', session);
    
    if (!session || session.user?.role !== 'SUPER_ADMIN') {
      console.log('Unauthorized access attempt:', session?.user);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Get time range from query params
    const searchParams = request.nextUrl.searchParams;
    const timeRange = (searchParams.get('timeRange') || '7d') as '24h' | '7d' | '30d' | '90d';
    console.log('Requested time range:', timeRange);

    // Get analytics data for the specified time range
    const range = await AnalyticsService.getTimeRange(timeRange);
    console.log('Time range:', range);
    
    const analytics = await AnalyticsService.getAnalytics(range);
    console.log('Analytics data:', analytics);

    return NextResponse.json(analytics);
  } catch (error) {
    console.error('Detailed analytics error:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
    });
    return NextResponse.json({ 
      error: 'Failed to fetch analytics',
      details: error.message 
    }, { status: 500 });
  }
}
