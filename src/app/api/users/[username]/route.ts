import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  try {
    const username = params.username;
    
    // Remove the @ symbol if present
    const cleanUsername = username.replace('@', '');

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { username: cleanUsername },
          { email: cleanUsername }
        ]
      },
      select: {
        id: true,
        name: true,
        image: true,
        username: true,
        bio: true,
        location: true,
        company: true,
        website: true,
        github: true,
        linkedin: true,
        twitter: true,
        projects: {
          where: {
            featured: true,
          },
          select: {
            id: true,
            title: true,
            description: true,
            imageUrl: true,
            demoUrl: true,
            githubUrl: true,
            technologies: true,
            featured: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        portfolioStats: {
          select: {
            portfolioViews: true,
            profileVisits: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Create or update portfolio stats
    const stats = await prisma.portfolioStats.upsert({
      where: {
        userId: user.id,
      },
      create: {
        userId: user.id,
        portfolioViews: 1,
        profileVisits: 1,
      },
      update: {
        profileVisits: {
          increment: 1,
        },
      },
    });

    // Return user data with updated stats
    return NextResponse.json({
      ...user,
      portfolioStats: stats,
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}
