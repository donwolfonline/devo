import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import mongoose from 'mongoose';

// Define Project model directly to ensure schema consistency
const projectSchema = new mongoose.Schema({
  name: String,
  team: String,
  progress: Number,
  status: {
    type: String,
    enum: ['active', 'review', 'completed', 'on-hold'],
  },
  startDate: Date,
  deadline: Date,
  teamMembers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: Date,
  updatedAt: Date,
});

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

export async function GET() {
  console.log('Starting project statistics calculation...');
  
  try {
    console.log('Connecting to database...');
    await dbConnect();
    console.log('Database connection successful');

    // Debug: Log current database name
    const dbName = mongoose.connection.db.databaseName;
    console.log('Connected to database:', dbName);

    // Debug: Log collections
    const collections = await mongoose.connection.db.collections();
    console.log('Available collections:', collections.map(c => c.collectionName));

    // Get current date and start of month
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    console.log('Calculating active projects...');
    // Get active projects count
    const activeProjectsCount = await Project.countDocuments({ 
      status: 'active' 
    });
    console.log('Active projects count:', activeProjectsCount);

    console.log('Calculating team members...');
    // Get total team members (unique count across all projects)
    const teamMembers = await Project.distinct('teamMembers');
    const teamMembersCount = teamMembers ? teamMembers.length : 0;
    console.log('Team members count:', teamMembersCount);

    console.log('Calculating project schedules...');
    // Calculate projects on schedule
    const totalProjects = await Project.countDocuments();
    console.log('Total projects:', totalProjects);
    
    const projectsOnSchedule = await Project.countDocuments({
      deadline: { $gte: now },
      status: { $in: ['active', 'review'] }
    });
    console.log('Projects on schedule:', projectsOnSchedule);
    
    const onSchedulePercentage = totalProjects > 0 
      ? Math.round((projectsOnSchedule / totalProjects) * 100)
      : 0;

    console.log('Calculating growth...');
    // Calculate growth (new projects this month)
    const lastMonthProjects = await Project.countDocuments({
      createdAt: { $lt: startOfMonth }
    });
    console.log('Last month projects:', lastMonthProjects);
    
    const currentProjects = await Project.countDocuments();
    console.log('Current projects:', currentProjects);
    
    const growthPercentage = lastMonthProjects > 0
      ? Math.round(((currentProjects - lastMonthProjects) / lastMonthProjects) * 100)
      : currentProjects > 0 ? 100 : 0;

    console.log('Fetching recent projects...');
    // Get recent projects
    const recentProjects = await Project
      .find({ status: { $in: ['active', 'review'] } })
      .sort({ updatedAt: -1 })
      .limit(3)
      .select('name team progress status')
      .lean();
    console.log('Recent projects:', recentProjects);

    const response = {
      activeProjects: activeProjectsCount,
      teamMembers: teamMembersCount,
      onSchedule: onSchedulePercentage,
      growth: growthPercentage,
      recentProjects: recentProjects || []
    };

    console.log('Successfully compiled project statistics:', response);
    return NextResponse.json(response);
    
  } catch (error) {
    console.error('Error calculating project statistics:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch project statistics',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
