import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // First, ensure the user has PortfolioStats
    const portfolioStats = await prisma.portfolioStats.upsert({
      where: {
        userId: session.user.id,
      },
      create: {
        userId: session.user.id,
        views: 0,
        visits: 0,
      },
      update: {},
    });

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        _count: {
          select: {
            projects: true,
          },
        },
        profile: {
          select: {
            skills: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const stats = {
      portfolioViews: portfolioStats.views,
      profileVisits: portfolioStats.visits,
      projects: user._count.projects,
      skills: user.profile?.skills?.length || 0,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}
