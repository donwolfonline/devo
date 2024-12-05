import mongoose from 'mongoose';

const SystemMetricsSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  systemHealth: {
    score: { type: Number, required: true },
    status: { type: String, required: true },
    checks: [{
      name: { type: String, required: true },
      status: { type: String, required: true },
      lastCheck: { type: Date, default: Date.now }
    }]
  },
  activeAlerts: [{
    type: { type: String, required: true },
    message: { type: String, required: true },
    severity: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    resolved: { type: Boolean, default: false }
  }],
  auditLogs: {
    totalCount: { type: Number, required: true },
    lastActivity: { type: Date, default: Date.now }
  },
  uptime: {
    percentage: { type: Number, required: true },
    lastDowntime: { type: Date },
    measurementPeriod: { type: Number, required: true }, // in days
    checks: [{
      timestamp: { type: Date, default: Date.now },
      status: { type: String, required: true }
    }]
  }
});

const SystemMetrics = mongoose.models.SystemMetrics || mongoose.model('SystemMetrics', SystemMetricsSchema);

export default SystemMetrics;
