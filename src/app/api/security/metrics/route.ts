import { NextResponse } from 'next/server';
import { getLatestMetrics, updateMetrics } from '@/lib/metrics';

export async function GET() {
  console.log('Starting security metrics API request');
  
  try {
    // Get latest metrics or create new ones if none exist
    let metrics = await getLatestMetrics();
    
    if (!metrics) {
      console.log('No existing metrics found, creating new metrics...');
      metrics = await updateMetrics();
    } else {
      // Check if metrics are stale (older than 5 minutes)
      const staleThreshold = 5 * 60 * 1000; // 5 minutes in milliseconds
      const metricsAge = Date.now() - new Date(metrics.createdAt).getTime();
      
      if (metricsAge > staleThreshold) {
        console.log('Metrics are stale, updating...');
        metrics = await updateMetrics();
      }
    }

    // Process metrics for response
    const activeAlerts = metrics.alerts?.filter(alert => alert.status === 'active') || [];
    
    const response = {
      systemHealth: metrics.systemHealth,
      activeAlerts: activeAlerts.length,
      alerts: activeAlerts,
      auditLogs: metrics.auditLogs,
      uptime: metrics.uptime
    };
    
    console.log('Sending successful response');
    return NextResponse.json(response);
  } catch (error) {
    console.error('Critical error in security metrics API:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch security metrics',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

// Add POST endpoint to force metrics update
export async function POST() {
  try {
    const metrics = await updateMetrics();
    return NextResponse.json({ success: true, metrics });
  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Failed to update metrics',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
