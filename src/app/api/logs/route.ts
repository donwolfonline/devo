import { NextRequest, NextResponse } from 'next/server';
import { authenticateAPI, unauthorized } from '@/lib/auth-helpers';
import connectDB from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(request: NextRequest) {
  const { authenticated, error } = await authenticateAPI(request, 'SUPER_ADMIN');
  
  if (!authenticated) {
    return NextResponse.json({ error }, { status: 401 });
  }

  try {
    const logEntry = await request.json();
    const db = await connectDB();

    await db.collection('systemLogs').insertOne({
      ...logEntry,
      timestamp: new Date(),
      userId: (await getServerSession(authOptions))?.user.id
    });

    return NextResponse.json({ message: 'Log entry created' });
  } catch (error) {
    console.error('Error creating log entry:', error);
    return NextResponse.json(
      { error: 'Failed to create log entry' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { authenticated, error } = await authenticateAPI(request, 'SUPER_ADMIN');
  
  if (!authenticated) {
    return NextResponse.json({ error }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const level = searchParams.get('level');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const limit = parseInt(searchParams.get('limit') || '100');

    const db = await connectDB();

    const query: any = {};
    if (category) query.category = category;
    if (level) query.level = level;
    if (startDate || endDate) {
      query.timestamp = {};
      if (startDate) query.timestamp.$gte = new Date(startDate);
      if (endDate) query.timestamp.$lte = new Date(endDate);
    }

    const logs = await db
      .collection('systemLogs')
      .find(query)
      .sort({ timestamp: -1 })
      .limit(limit)
      .toArray();

    return NextResponse.json(logs);
  } catch (error) {
    console.error('Error fetching logs:', error);
    return NextResponse.json({ error: 'Failed to fetch logs' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const { authenticated, error } = await authenticateAPI(request, 'SUPER_ADMIN');
  
  if (!authenticated) {
    return NextResponse.json({ error }, { status: 401 });
  }

  try {
    const { timestamp } = await request.json();
    const db = await connectDB();

    await db.collection('systemLogs').deleteMany({
      timestamp: { $lt: new Date(timestamp) }
    });

    return NextResponse.json({ message: 'Old logs cleared' });
  } catch (error) {
    console.error('Error clearing old logs:', error);
    return NextResponse.json(
      { error: 'Failed to clear old logs' },
      { status: 500 }
    );
  }
}
