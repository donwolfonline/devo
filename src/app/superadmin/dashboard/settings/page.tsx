'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import BackupDialog from '@/components/BackupDialog';
import { log } from '@/lib/logger';
import { 
  Bell, 
  Shield, 
  Mail, 
  Database,
  Save,
  AlertCircle,
  Key,
  Clock,
  Shield as ShieldIcon
} from 'lucide-react';
import { sendEmail } from '@/lib/emailTemplates';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import DashboardHeading from '@/components/shared/DashboardHeading';
import './settings.css';

export default function SettingsPage() {
  const { isAuthorized, isLoading } = useAuthGuard({
    role: 'SUPER_ADMIN',
    redirectTo: '/superadmin'
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [storageInfo, setStorageInfo] = useState<{
    used: number;
    total: number;
    backupsSize: number;
    databaseSize: number;
    uploadsSize: number;
  } | null>(null);

  const [isBackupDialogOpen, setIsBackupDialogOpen] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [maintenanceUpdates, setMaintenanceUpdates] = useState(false);
  const [dataRetention, setDataRetention] = useState('30');
  const [passwordLength, setPasswordLength] = useState('8');
  const [sessionTimeout, setSessionTimeout] = useState('30');
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [backupFrequency, setBackupFrequency] = useState('daily');
  const [storageLocation, setStorageLocation] = useState('local');
  const [backupRetention, setBackupRetention] = useState('5');
  const [automatedBackups, setAutomatedBackups] = useState(true);
  const [dataEncryption, setDataEncryption] = useState(true);
  const [smtpServer, setSmtpServer] = useState('');
  const [smtpPort, setSmtpPort] = useState('');
  const [smtpEncryption, setSmtpEncryption] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderName, setSenderName] = useState('');
  const [smtpUsername, setSmtpUsername] = useState('');
  const [smtpPassword, setSmtpPassword] = useState('');
  const [emailAuthentication, setEmailAuthentication] = useState(true);
  const [performanceMonitoring, setPerformanceMonitoring] = useState(true);
  const [resourceThreshold, setResourceThreshold] = useState('80');
  const [auditLogRetention, setAuditLogRetention] = useState('90');
  const [apiRateLimit, setApiRateLimit] = useState('1000');
  const [rateLimitWindow, setRateLimitWindow] = useState('60');
  const [maintenanceWindow, setMaintenanceWindow] = useState('');
  const [maintenanceDuration, setMaintenanceDuration] = useState('60');
  const [backupSchedule, setBackupSchedule] = useState('0 0 * * *');
  const [enableAuditLog, setEnableAuditLog] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await fetch('/api/settings');
        if (!response.ok) {
          throw new Error('Failed to load settings');
        }
        const data = await response.json();
        
        setEmailNotifications(data.notifications?.emailNotifications ?? true);
        setSecurityAlerts(data.notifications?.securityAlerts ?? true);
        setMaintenanceUpdates(data.notifications?.maintenanceUpdates ?? false);
        setDataRetention(data.data?.dataRetention ?? '30');
        setPasswordLength(data.security?.passwordLength ?? '8');
        setSessionTimeout(data.security?.sessionTimeout ?? '30');
        setTwoFactorAuth(data.security?.twoFactorAuth ?? false);
        setBackupFrequency(data.data?.backupFrequency ?? 'daily');
        setStorageLocation(data.data?.storageLocation ?? 'local');
        setBackupRetention(data.data?.backupRetention ?? '5');
        setAutomatedBackups(data.data?.automatedBackups ?? true);
        setDataEncryption(data.data?.dataEncryption ?? true);
        setSmtpServer(data.email?.smtpServer ?? '');
        setSmtpPort(data.email?.smtpPort ?? '');
        setSmtpEncryption(data.email?.smtpEncryption ?? '');
        setSenderEmail(data.email?.senderEmail ?? '');
        setSenderName(data.email?.senderName ?? '');
        setSmtpUsername(data.email?.smtpUsername ?? '');
        setSmtpPassword(data.email?.smtpPassword ?? '');
        setEmailAuthentication(data.email?.emailAuthentication ?? true);
        setPerformanceMonitoring(data.performance?.performanceMonitoring ?? true);
        setResourceThreshold(data.performance?.resourceThreshold ?? '80');
        setAuditLogRetention(data.auditLog?.auditLogRetention ?? '90');
        setApiRateLimit(data.apiRateLimit?.apiRateLimit ?? '1000');
        setRateLimitWindow(data.apiRateLimit?.rateLimitWindow ?? '60');
        setMaintenanceWindow(data.maintenance?.maintenanceWindow ?? '');
        setMaintenanceDuration(data.maintenance?.maintenanceDuration ?? '60');
        setBackupSchedule(data.backup?.backupSchedule ?? '0 0 * * *');
        setEnableAuditLog(data.auditLog?.enableAuditLog ?? true);
      } catch (error) {
        console.error('Error loading settings:', error);
        setError('Failed to load settings');
      }
    };

    loadSettings();
  }, []);

  useEffect(() => {
    const loadStorageInfo = async () => {
      try {
        const response = await fetch('/api/storage');
        if (!response.ok) {
          throw new Error('Failed to load storage info');
        }
        const data = await response.json();
        setStorageInfo(data);
      } catch (error) {
        console.error('Error loading storage info:', error);
      }
    };

    loadStorageInfo();
    const interval = setInterval(loadStorageInfo, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleSave = async () => {
    try {
      setLoading(true);
      setError(null);

      const settings = {
        email: {
          smtpServer,
          smtpPort,
          smtpEncryption,
          senderEmail,
          senderName,
          smtpUsername,
          smtpPassword,
          emailAuthentication
        },
        data: {
          dataRetention,
          automatedBackups,
          backupFrequency,
          storageLocation,
          dataEncryption,
          backupRetention
        },
        notifications: {
          emailNotifications,
          securityAlerts,
          maintenanceUpdates
        },
        security: {
          passwordLength,
          sessionTimeout,
          twoFactorAuth
        },
        performance: {
          performanceMonitoring,
          resourceThreshold
        },
        auditLog: {
          auditLogRetention,
          enableAuditLog
        },
        apiRateLimit: {
          apiRateLimit,
          rateLimitWindow
        },
        maintenance: {
          maintenanceWindow,
          maintenanceDuration
        },
        backup: {
          backupSchedule
        }
      };

      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });

      if (!response.ok) {
        throw new Error('Failed to save settings');
      }

      await log('info', 'settings', 'System settings updated', {
        changes: [
          'Email configuration',
          'Data management settings',
          'Notification preferences',
          'Security settings',
          'Performance settings',
          'Audit log settings',
          'API rate limiting settings',
          'Maintenance settings',
          'Backup settings'
        ]
      });

      toast.success('Settings saved successfully');
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthorized) {
    return null;
  }

  return (
    <div className="p-6">
      <DashboardHeading 
        title="System Settings"
        description="Configure and manage system-wide settings and preferences"
        action={
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-200 ease-in-out flex items-center gap-2 shadow-lg hover:shadow-purple-500/20"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Email Settings Card */}
        <div className="bg-gray-900/50 backdrop-blur-xl rounded-xl p-6 border border-gray-800 hover:border-purple-500/50 transition-all duration-300 shadow-lg hover:shadow-purple-500/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Mail className="w-5 h-5 text-purple-500" />
            </div>
            <h2 className="text-xl font-semibold text-white">Email Configuration</h2>
          </div>
          <div className="space-y-4">
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">SMTP Server</label>
                <input
                  type="text"
                  value={smtpServer}
                  onChange={(e) => setSmtpServer(e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="smtp.example.com"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Port</label>
                  <input
                    type="text"
                    value={smtpPort}
                    onChange={(e) => setSmtpPort(e.target.value)}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="587"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Encryption</label>
                  <select
                    value={smtpEncryption}
                    onChange={(e) => setSmtpEncryption(e.target.value)}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">None</option>
                    <option value="tls">TLS</option>
                    <option value="ssl">SSL</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between py-3 border-t border-gray-800">
              <span className="text-sm font-medium text-gray-300">Require Authentication</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox"
                  checked={emailAuthentication}
                  onChange={(e) => setEmailAuthentication(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            {emailAuthentication && (
              <div className="space-y-4 pt-4 border-t border-gray-800">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Username</label>
                  <input
                    type="text"
                    value={smtpUsername}
                    onChange={(e) => setSmtpUsername(e.target.value)}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                  <input
                    type="password"
                    value={smtpPassword}
                    onChange={(e) => setSmtpPassword(e.target.value)}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Data Management Card */}
        <div className="bg-gray-900/50 backdrop-blur-xl rounded-xl p-6 border border-gray-800 hover:border-purple-500/50 transition-all duration-300 shadow-lg hover:shadow-purple-500/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Database className="w-5 h-5 text-purple-500" />
            </div>
            <h2 className="text-xl font-semibold text-white">Data Management</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Data Retention (days)</label>
              <input
                type="number"
                value={dataRetention}
                onChange={(e) => setDataRetention(e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                min="1"
                max="365"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Storage Location</label>
              <select
                value={storageLocation}
                onChange={(e) => setStorageLocation(e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              >
                <option value="local">Local Storage</option>
                <option value="s3">Amazon S3</option>
                <option value="gcs">Google Cloud Storage</option>
              </select>
            </div>

            <div className="flex items-center justify-between py-3 border-t border-gray-800">
              <span className="text-sm font-medium text-gray-300">Enable Automated Backups</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox"
                  checked={automatedBackups}
                  onChange={(e) => setAutomatedBackups(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            {storageInfo && (
              <div className="mt-6 space-y-4">
                <h3 className="text-sm font-semibold text-gray-300">Storage Usage</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Database</span>
                    <span className="text-white font-medium">{storageInfo.databaseSize} MB</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Backups</span>
                    <span className="text-white font-medium">{storageInfo.backupsSize} MB</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Uploads</span>
                    <span className="text-white font-medium">{storageInfo.uploadsSize} MB</span>
                  </div>
                  <div className="mt-2">
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-600 rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.min((storageInfo.used / storageInfo.total) * 100, 100)}%`
                        }}
                      />
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-gray-400">
                      <span>{Math.round(storageInfo.used)}GB used</span>
                      <span>{Math.round(storageInfo.total)}GB total</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Security Card */}
        <div className="bg-gray-900/50 backdrop-blur-xl rounded-xl p-6 border border-gray-800 hover:border-purple-500/50 transition-all duration-300 shadow-lg hover:shadow-purple-500/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Shield className="w-5 h-5 text-purple-500" />
            </div>
            <h2 className="text-xl font-semibold text-white">Security</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Minimum Password Length</label>
              <input
                type="number"
                value={passwordLength}
                onChange={(e) => setPasswordLength(e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                min="8"
                max="32"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Session Timeout (minutes)</label>
              <input
                type="number"
                value={sessionTimeout}
                onChange={(e) => setSessionTimeout(e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                min="5"
                max="240"
              />
            </div>

            <div className="flex items-center justify-between py-3 border-t border-gray-800">
              <span className="text-sm font-medium text-gray-300">Require Two-Factor Authentication</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox"
                  checked={twoFactorAuth}
                  onChange={(e) => setTwoFactorAuth(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Notifications Card */}
        <div className="bg-gray-900/50 backdrop-blur-xl rounded-xl p-6 border border-gray-800 hover:border-purple-500/50 transition-all duration-300 shadow-lg hover:shadow-purple-500/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Bell className="w-5 h-5 text-purple-500" />
            </div>
            <h2 className="text-xl font-semibold text-white">Notifications</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-t border-gray-800">
              <span className="text-sm font-medium text-gray-300">Email Notifications</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-3 border-t border-gray-800">
              <span className="text-sm font-medium text-gray-300">Security Alerts</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox"
                  checked={securityAlerts}
                  onChange={(e) => setSecurityAlerts(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-3 border-t border-gray-800">
              <span className="text-sm font-medium text-gray-300">Maintenance Updates</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox"
                  checked={maintenanceUpdates}
                  onChange={(e) => setMaintenanceUpdates(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* System Performance Card */}
        <div className="bg-gray-900/50 backdrop-blur-xl rounded-xl p-6 border border-gray-800 hover:border-purple-500/50 transition-all duration-300 shadow-lg hover:shadow-purple-500/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Clock className="w-5 h-5 text-purple-500" />
            </div>
            <h2 className="text-xl font-semibold text-white">System Performance</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-t border-gray-800">
              <span className="text-sm font-medium text-gray-300">Performance Monitoring</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox"
                  checked={performanceMonitoring}
                  onChange={(e) => setPerformanceMonitoring(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Resource Alert Threshold (%)</label>
              <input
                type="number"
                value={resourceThreshold}
                onChange={(e) => setResourceThreshold(e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                min="50"
                max="95"
              />
            </div>
          </div>
        </div>

        {/* Audit Log Settings Card */}
        <div className="bg-gray-900/50 backdrop-blur-xl rounded-xl p-6 border border-gray-800 hover:border-purple-500/50 transition-all duration-300 shadow-lg hover:shadow-purple-500/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <ShieldIcon className="w-5 h-5 text-purple-500" />
            </div>
            <h2 className="text-xl font-semibold text-white">Audit Log Settings</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-t border-gray-800">
              <span className="text-sm font-medium text-gray-300">Enable Audit Logging</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox"
                  checked={enableAuditLog}
                  onChange={(e) => setEnableAuditLog(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Log Retention (days)</label>
              <input
                type="number"
                value={auditLogRetention}
                onChange={(e) => setAuditLogRetention(e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                min="30"
                max="365"
              />
            </div>
          </div>
        </div>

        {/* API Rate Limiting Card */}
        <div className="bg-gray-900/50 backdrop-blur-xl rounded-xl p-6 border border-gray-800 hover:border-purple-500/50 transition-all duration-300 shadow-lg hover:shadow-purple-500/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Key className="w-5 h-5 text-purple-500" />
            </div>
            <h2 className="text-xl font-semibold text-white">API Rate Limiting</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Requests per Window</label>
              <input
                type="number"
                value={apiRateLimit}
                onChange={(e) => setApiRateLimit(e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                min="100"
                max="10000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Time Window (seconds)</label>
              <input
                type="number"
                value={rateLimitWindow}
                onChange={(e) => setRateLimitWindow(e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                min="30"
                max="3600"
              />
            </div>
          </div>
        </div>

        {/* Maintenance Settings Card */}
        <div className="bg-gray-900/50 backdrop-blur-xl rounded-xl p-6 border border-gray-800 hover:border-purple-500/50 transition-all duration-300 shadow-lg hover:shadow-purple-500/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <AlertCircle className="w-5 h-5 text-purple-500" />
            </div>
            <h2 className="text-xl font-semibold text-white">System Maintenance</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Maintenance Window</label>
              <input
                type="datetime-local"
                value={maintenanceWindow}
                onChange={(e) => setMaintenanceWindow(e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Duration (minutes)</label>
              <input
                type="number"
                value={maintenanceDuration}
                onChange={(e) => setMaintenanceDuration(e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                min="15"
                max="240"
              />
            </div>
          </div>
        </div>
      </div>

      <BackupDialog
        isOpen={isBackupDialogOpen}
        onClose={() => setIsBackupDialogOpen(false)}
      />
    </div>
  );
}
