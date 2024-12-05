import mongoose, { Schema, Model } from 'mongoose';

interface ISessionManagement {
  userId: mongoose.Types.ObjectId;
  sessions: Array<{
    sessionToken: string;
    createdAt: Date;
    lastActivity: Date;
    deviceInfo?: string;
    ipAddress?: string;
  }>;
  settings: {
    autoLogoutEnabled: boolean;
    autoLogoutTimeMinutes: number;
    multipleSessions: boolean;
    maxConcurrentSessions: number;
  };
}

const sessionManagementSchema = new Schema<ISessionManagement>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  sessions: [{
    sessionToken: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    lastActivity: { type: Date, default: Date.now },
    deviceInfo: { type: String },
    ipAddress: { type: String },
  }],
  settings: {
    autoLogoutEnabled: { type: Boolean, default: false },
    autoLogoutTimeMinutes: { type: Number, default: 30 },
    multipleSessions: { type: Boolean, default: true },
    maxConcurrentSessions: { type: Number, default: 3 },
  }
}, {
  timestamps: true
});

// Add index for performance
sessionManagementSchema.index({ userId: 1 });
sessionManagementSchema.index({ 'sessions.sessionToken': 1 });

let SessionManagement: Model<ISessionManagement>;

try {
  // Try to get the existing model
  SessionManagement = mongoose.model<ISessionManagement>('SessionManagement');
} catch {
  // Model doesn't exist, create it
  SessionManagement = mongoose.model<ISessionManagement>('SessionManagement', sessionManagementSchema);
}

export default SessionManagement;
