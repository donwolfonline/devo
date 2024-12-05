import mongoose, { Model } from 'mongoose';

export interface ISecuritySettings {
  twoFactorAuth: boolean;
  passwordComplexity: boolean;
  ipWhitelisting: boolean;
  failedLoginLockout: boolean;
  sessionTimeout: boolean;
  auditLogging: boolean;
  encryptedStorage: boolean;
}

const SecuritySettingsSchema = new mongoose.Schema<ISecuritySettings>({
  twoFactorAuth: {
    type: Boolean,
    default: false
  },
  passwordComplexity: {
    type: Boolean,
    default: true
  },
  ipWhitelisting: {
    type: Boolean,
    default: false
  },
  failedLoginLockout: {
    type: Boolean,
    default: true
  },
  sessionTimeout: {
    type: Boolean,
    default: true
  },
  auditLogging: {
    type: Boolean,
    default: true
  },
  encryptedStorage: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  collection: 'securitysettings'
});

let SecuritySettings: Model<ISecuritySettings>;

try {
  SecuritySettings = mongoose.model<ISecuritySettings>('SecuritySettings');
} catch {
  SecuritySettings = mongoose.model<ISecuritySettings>('SecuritySettings', SecuritySettingsSchema);
}

export default SecuritySettings;
