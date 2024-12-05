import { connectDB } from './mongodb';
import SecurityMetric from '@/models/SecurityMetric';
import mongoose from 'mongoose';

// System health checks
async function checkDatabaseHealth() {
  try {
    await mongoose.connection.db.admin().ping();
    return { status: 'healthy', score: 100 };
  } catch (error) {
    return { status: 'error', score: 0 };
  }
}

async function checkAPIHealth() {
  try {
    const response = await fetch('/api/health');
    return response.ok ? { status: 'healthy', score: 100 } : { status: 'error', score: 0 };
  } catch (error) {
    return { status: 'error', score: 0 };
  }
}

// Calculate system health score
async function calculateSystemHealth() {
  const checks = [
    await checkDatabaseHealth(),
    await checkAPIHealth()
  ];
  
  const totalScore = checks.reduce((sum, check) => sum + check.score, 0);
  const averageScore = totalScore / checks.length;
  
  return {
    score: Math.round(averageScore),
    status: averageScore > 90 ? 'normal' : averageScore > 70 ? 'warning' : 'critical',
    lastUpdated: new Date()
  };
}

// Get active alerts
async function getActiveAlerts() {
  const alerts = [];
  
  // Check for system warnings
  const health = await calculateSystemHealth();
  if (health.score < 90) {
    alerts.push({
      type: 'system_health',
      severity: health.score < 70 ? 'critical' : 'warning',
      message: `System health is at ${health.score}%`,
      timestamp: new Date(),
      status: 'active'
    });
  }
  
  // Check for failed login attempts (last hour)
  const failedLogins = await mongoose.connection.db
    .collection('audit_logs')
    .countDocuments({
      event: 'login_failed',
      timestamp: { $gte: new Date(Date.now() - 3600000) }
    });
    
  if (failedLogins > 5) {
    alerts.push({
      type: 'security',
      severity: 'warning',
      message: `High number of failed login attempts: ${failedLogins} in the last hour`,
      timestamp: new Date(),
      status: 'active'
    });
  }
  
  return alerts;
}

// Calculate uptime
async function calculateUptime() {
  const lastDay = new Date(Date.now() - 86400000);
  const downtimeEvents = await mongoose.connection.db
    .collection('audit_logs')
    .countDocuments({
      event: 'system_down',
      timestamp: { $gte: lastDay }
    });
  
  // Each downtime event is assumed to be 5 minutes
  const downMinutes = downtimeEvents * 5;
  const uptimePercentage = 100 - ((downMinutes / 1440) * 100); // 1440 minutes in a day
  
  return {
    percentage: Math.round(uptimePercentage * 10) / 10, // Round to 1 decimal place
    measurementPeriod: 1,
    lastDowntime: downtimeEvents > 0 ? await getLastDowntime() : null
  };
}

async function getLastDowntime() {
  const lastDowntime = await mongoose.connection.db
    .collection('audit_logs')
    .findOne(
      { event: 'system_down' },
      { sort: { timestamp: -1 } }
    );
  return lastDowntime?.timestamp || null;
}

// Get audit log metrics
async function getAuditMetrics() {
  const totalCount = await mongoose.connection.db
    .collection('audit_logs')
    .countDocuments();
    
  const lastActivity = await mongoose.connection.db
    .collection('audit_logs')
    .findOne(
      {},
      { sort: { timestamp: -1 } }
    );
    
  return {
    totalCount,
    lastActivity: lastActivity?.timestamp || new Date(),
    status: 'active'
  };
}

// Update metrics
export async function updateMetrics() {
  try {
    await connectDB();
    
    const [systemHealth, alerts, uptime, auditLogs] = await Promise.all([
      calculateSystemHealth(),
      getActiveAlerts(),
      calculateUptime(),
      getAuditMetrics()
    ]);
    
    const metrics = await SecurityMetric.create({
      systemHealth,
      alerts,
      auditLogs,
      uptime
    });
    
    return metrics;
  } catch (error) {
    console.error('Failed to update metrics:', error);
    throw error;
  }
}

// Get latest metrics
export async function getLatestMetrics() {
  try {
    await connectDB();
    return await SecurityMetric.findOne().sort({ createdAt: -1 }).lean();
  } catch (error) {
    console.error('Failed to get latest metrics:', error);
    throw error;
  }
}
