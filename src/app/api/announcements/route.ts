import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { connectDB } from '@/lib/mongodb';
import mongoose from 'mongoose';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { message, priority } = await req.json();

    if (!message?.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    await connectDB();
    
    // Save announcement to database
    const announcement = {
      message,
      priority,
      createdBy: session.user.email,
      createdAt: new Date(),
      isActive: true
    };

    await mongoose.connection.db.collection('announcements').insertOne(announcement);

    // Here you could also:
    // 1. Send email notifications
    // 2. Send push notifications
    // 3. Trigger webhooks
    // 4. Update real-time dashboard

    return NextResponse.json({ 
      message: 'Announcement sent successfully',
      announcement 
    });
  } catch (error) {
    console.error('Error sending announcement:', error);
    return NextResponse.json({ 
      error: 'Failed to send announcement',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    
    const announcements = await mongoose.connection.db
      .collection('announcements')
      .find({ isActive: true })
      .sort({ createdAt: -1 })
      .limit(10)
      .toArray();

    return NextResponse.json(announcements);
  } catch (error) {
    console.error('Error fetching announcements:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch announcements',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
