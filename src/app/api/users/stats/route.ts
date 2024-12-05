import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { connectDB } from '@/lib/mongodb';
import mongoose from 'mongoose';

export async function GET() {
  try {
    // Check authentication first
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Connect to database with error handling
    try {
      await connectDB();
    } catch (dbError) {
      console.error('Database connection error:', dbError);
      return NextResponse.json({
        error: 'Database connection failed',
        details: dbError instanceof Error ? dbError.message : 'Unknown error'
      }, { status: 500 });
    }

    // Initialize response data with defaults
    const stats = {
      totalUsers: 0,
      activeUsers: 0,
      totalProjects: 0
    };

    // Get total users count
    try {
      stats.totalUsers = await mongoose.connection.db.collection('users').countDocuments();
    } catch (error) {
      console.error('Error counting users:', error);
    }

    // Get total projects count
    try {
      stats.totalProjects = await mongoose.connection.db.collection('projects').countDocuments();
    } catch (error) {
      console.error('Error counting projects:', error);
      // If projects collection doesn't exist, that's ok - keep default 0
    }

    // Get active users count
    try {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      stats.activeUsers = await mongoose.connection.db.collection('users').countDocuments({
        lastLogin: { $gte: thirtyDaysAgo }
      });
    } catch (error) {
      console.error('Error counting active users:', error);
      // If lastLogin field doesn't exist, count all users as active
      stats.activeUsers = stats.totalUsers;
    }

    // Return whatever data we were able to gather
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error in user stats endpoint:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch user stats',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
