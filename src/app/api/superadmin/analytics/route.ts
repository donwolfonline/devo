import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import os from 'os';

export async function GET(request: NextRequest) {
  try {
    // Check if user is authenticated as SUPER_ADMIN
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Fetch total users
    const totalUsers = await prisma.user.count();

    // Fetch project-related metrics
    const totalProjects = await prisma.Project.count();
    const activeProjects = await prisma.Project.count({
      where: { status: 'ACTIVE' }
    });
    const completedProjects = await prisma.Project.count({
      where: { status: 'COMPLETED' }
    });

    // Calculate average projects per user
    const avgProjectsPerUser = totalProjects > 0 
      ? Number((totalProjects / totalUsers).toFixed(2)) 
      : 0;

    // Calculate system uptime
    const uptimeSeconds = os.uptime();
    const uptimeHours = Math.floor(uptimeSeconds / 3600);
    const systemUptime = `${uptimeHours}h`;

    // Simulated growth metrics (you might want to replace with actual calculations)
    const userGrowth = 15; // Percentage
    const projectGrowth = 10; // Percentage

    return NextResponse.json({
      totalUsers,
      totalProjects,
      activeProjects,
      completedProjects,
      avgProjectsPerUser,
      systemUptime,
      userGrowth,
      projectGrowth
    });
  } catch (error) {
    console.error('Analytics fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}
