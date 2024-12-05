import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for SecurityMetric document
export interface ISecurityMetric extends Document {
  systemHealth: {
    score: number;
    status: string;
    lastUpdated: Date;
  };
  alerts: Array<{
    type: string;
    severity: string;
    message: string;
    timestamp: Date;
    status: string;
  }>;
  auditLogs: {
    totalCount: number;
    lastActivity: Date;
    status: string;
  };
  uptime: {
    percentage: number;
    lastDowntime?: Date;
    measurementPeriod: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const SecurityMetricSchema = new Schema({
  systemHealth: {
    score: { type: Number, required: true },
    status: { type: String, required: true },
    lastUpdated: { type: Date, default: Date.now }
  },
  alerts: [{
    type: { type: String, required: true },
    severity: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    status: { type: String, default: 'active' }
  }],
  auditLogs: {
    totalCount: { type: Number, default: 0 },
    lastActivity: { type: Date, default: Date.now },
    status: { type: String, required: true }
  },
  uptime: {
    percentage: { type: Number, required: true },
    lastDowntime: { type: Date },
    measurementPeriod: { type: Number, default: 30 }
  }
}, {
  timestamps: true
});

// Check if the model exists before creating a new one
const SecurityMetric = mongoose.models.SecurityMetric || mongoose.model<ISecurityMetric>('SecurityMetric', SecurityMetricSchema);

export default SecurityMetric;
