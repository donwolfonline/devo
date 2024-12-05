import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import SecurityMetric from '@/models/SecurityMetric';
import { 
  generateSecurityEvent, 
  simulateSystemHealth, 
  simulateUptime, 
  generateAuditLogEntry 
} from '@/utils/securitySimulator';

export async function POST() {
  try {
    await dbConnect();

    // Get current metrics or create new ones
    let metrics = await SecurityMetric.findOne().sort({ createdAt: -1 });
    
    if (!metrics) {
      metrics = await SecurityMetric.create({
        systemHealth: {
          score: 100,
          status: 'normal',
        },
        alerts: [],
        auditLogs: {
          totalCount: 0,
          status: 'active'
        },
        uptime: {
          percentage: 100,
          measurementPeriod: 30
        }
      });
    }

    // Generate new security event
    const newEvent = generateSecurityEvent();
    
    // Update system health
    const healthScore = simulateSystemHealth();
    const healthStatus = healthScore > 95 ? 'normal' : 'warning';

    // Update metrics
    metrics.systemHealth = {
      score: healthScore,
      status: healthStatus,
      lastUpdated: new Date()
    };

    // Add new alert
    metrics.alerts.push({
      type: newEvent.type,
      severity: newEvent.severity,
      message: newEvent.message,
      timestamp: new Date(),
      status: 'active'
    });

    // Keep only last 10 alerts
    if (metrics.alerts.length > 10) {
      metrics.alerts = metrics.alerts.slice(-10);
    }

    // Update audit logs
    metrics.auditLogs.totalCount += 1;
    metrics.auditLogs.lastActivity = new Date();
    metrics.auditLogs.status = 'active';

    // Update uptime
    metrics.uptime.percentage = simulateUptime();
    
    await metrics.save();

    return NextResponse.json({
      message: 'Security event simulated successfully',
      event: newEvent
    });
  } catch (error) {
    console.error('Error simulating security event:', error);
    return NextResponse.json(
      { error: 'Failed to simulate security event' },
      { status: 500 }
    );
  }
}

// Endpoint to resolve an alert
export async function PUT(request: Request) {
  try {
    const { alertId } = await request.json();
    await dbConnect();

    const metrics = await SecurityMetric.findOne().sort({ createdAt: -1 });
    if (!metrics) {
      return NextResponse.json(
        { error: 'No metrics found' },
        { status: 404 }
      );
    }

    // Find and resolve the alert
    const alert = metrics.alerts.find(a => a._id.toString() === alertId);
    if (alert) {
      alert.status = 'resolved';
      await metrics.save();
    }

    return NextResponse.json({
      message: 'Alert resolved successfully'
    });
  } catch (error) {
    console.error('Error resolving alert:', error);
    return NextResponse.json(
      { error: 'Failed to resolve alert' },
      { status: 500 }
    );
  }
}
