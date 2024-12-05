import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import SecurityMetric from '@/models/SecurityMetric';
import { connectDB } from '@/lib/mongodb';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || session.user.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { alertId } = await req.json();
    if (!alertId) {
      return NextResponse.json({ error: 'Alert ID is required' }, { status: 400 });
    }

    await connectDB();

    // Get the latest metrics document
    const latestMetrics = await SecurityMetric.findOne().sort({ createdAt: -1 });
    if (!latestMetrics) {
      return NextResponse.json({ error: 'No metrics found' }, { status: 404 });
    }

    // Find and update the alert
    const alert = latestMetrics.alerts.find(a => a._id.toString() === alertId);
    if (!alert) {
      return NextResponse.json({ error: 'Alert not found' }, { status: 404 });
    }

    // Create a new metrics document with the resolved alert
    const newMetrics = await SecurityMetric.create({
      ...latestMetrics.toObject(),
      _id: undefined,
      alerts: latestMetrics.alerts.map(a => 
        a._id.toString() === alertId 
          ? { ...a, status: 'resolved', resolvedAt: new Date() }
          : a
      )
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Alert resolved successfully',
      metrics: newMetrics
    });
  } catch (error) {
    console.error('Error resolving alert:', error);
    return NextResponse.json(
      { error: 'Failed to resolve alert' },
      { status: 500 }
    );
  }
}
