import mongoose from 'mongoose';

export interface ILog extends mongoose.Document {
  type: string;
  message: string;
  userId?: string;
  adminId?: string;
  targetUserId?: string;
  metadata?: Record<string, any>;
  timestamp: Date;
}

const LogSchema = new mongoose.Schema<ILog>({
  type: {
    type: String,
    required: true,
    enum: [
      'LOGIN', 
      'LOGOUT', 
      'USER_CREATED', 
      'USER_UPDATED', 
      'USER_DELETED', 
      'IMPERSONATION', 
      'ADMIN_ACTION', 
      'SECURITY_EVENT'
    ]
  },
  message: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    ref: 'User'
  },
  adminId: {
    type: String,
    ref: 'User'
  },
  targetUserId: {
    type: String,
    ref: 'User'
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  }
}, {
  timestamps: true,
  collection: 'logs'
});

// Create indexes for efficient querying
LogSchema.index({ type: 1, timestamp: -1 });
LogSchema.index({ userId: 1, timestamp: -1 });
LogSchema.index({ adminId: 1, timestamp: -1 });

const Log = mongoose.models.Log || mongoose.model<ILog>('Log', LogSchema);

export default Log;
