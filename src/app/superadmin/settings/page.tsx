'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

interface SystemSettings {
  email: {
    smtpServer: string;
    smtpPort: string;
    smtpEncryption: string;
    senderEmail: string;
    senderName: string;
    smtpUsername: string;
    smtpPassword: string;
    emailAuthentication: boolean;
  };
  data: {
    dataRetention: string;
    automatedBackups: boolean;
    backupFrequency: string;
    storageLocation: string;
    dataEncryption: boolean;
    backupRetention: string;
  };
  notifications: {
    emailNotifications: boolean;
    securityAlerts: boolean;
    maintenanceUpdates: boolean;
    systemNotifications: boolean;
    userActivityAlerts: boolean;
    performanceAlerts: boolean;
  };
  security: {
    passwordLength: string;
    sessionTimeout: string;
    twoFactorAuth: boolean;
  };
}

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [settings, setSettings] = useState<SystemSettings>({
    email: {
      smtpServer: '',
      smtpPort: '',
      smtpEncryption: '',
      senderEmail: '',
      senderName: '',
      smtpUsername: '',
      smtpPassword: '',
      emailAuthentication: true,
    },
    data: {
      dataRetention: '30',
      automatedBackups: true,
      backupFrequency: 'daily',
      storageLocation: 'local',
      dataEncryption: true,
      backupRetention: '5',
    },
    notifications: {
      emailNotifications: true,
      securityAlerts: true,
      maintenanceUpdates: false,
      systemNotifications: true,
      userActivityAlerts: true,
      performanceAlerts: false,
    },
    security: {
      passwordLength: '8',
      sessionTimeout: '30',
      twoFactorAuth: false,
    },
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('email');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    } else if (session?.user?.role !== 'SUPER_ADMIN') {
      router.push('/');
    } else {
      fetchSettings();
    }
  }, [status, session]);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings');
      if (!response.ok) throw new Error('Failed to fetch settings');
      const data = await response.json();
      setSettings(data);
    } catch (error) {
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (!response.ok) throw new Error('Failed to save settings');
      toast.success('Settings saved successfully');
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const handleTestEmail = async () => {
    try {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings.email),
      });
      if (!response.ok) throw new Error('Failed to test email configuration');
      toast.success('Email test successful');
    } catch (error) {
      toast.error('Email test failed');
    }
  };

  const updateSettings = (section: keyof SystemSettings, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">System Settings</h1>

      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {['email', 'data', 'notifications', 'security'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`${
                  activeTab === tab
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        {activeTab === 'email' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">SMTP Server</label>
                <input
                  type="text"
                  value={settings.email.smtpServer}
                  onChange={(e) => updateSettings('email', 'smtpServer', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter SMTP server address"
                  title="SMTP server configuration"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">SMTP Port</label>
                <input
                  type="text"
                  value={settings.email.smtpPort}
                  onChange={(e) => updateSettings('email', 'smtpPort', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter SMTP port number"
                  title="SMTP port configuration"
                />
              </div>
            </div>
            <button
              onClick={handleTestEmail}
              className="ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Test Email Configuration
            </button>
          </div>
        )}

        {activeTab === 'data' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Data Retention (days)</label>
                <input
                  type="number"
                  value={settings.data.dataRetention}
                  onChange={(e) => updateSettings('data', 'dataRetention', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  title="Number of days to retain data"
                  placeholder="Enter data retention period"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Backup Frequency</label>
                <select
                  value={settings.data.backupFrequency}
                  onChange={(e) => updateSettings('data', 'backupFrequency', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  title="How often backups should be performed"
                >
                  <option value="" disabled>Select backup frequency</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-6">
            {Object.entries(settings.notifications).map(([key, value]) => (
              <div key={key} className="flex items-center">
                <input
                  type="checkbox"
                  id={`notification-${key}`}
                  checked={value}
                  onChange={(e) => updateSettings('notifications', key, e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  title={`Toggle ${key.replace(/([A-Z])/g, ' $1').trim()} notifications`}
                />
                <label 
                  htmlFor={`notification-${key}`} 
                  className="ml-2 block text-sm text-gray-900 capitalize"
                >
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Minimum Password Length</label>
                <input
                  type="number"
                  value={settings.security.passwordLength}
                  onChange={(e) => updateSettings('security', 'passwordLength', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  title="Set the minimum required length for user passwords"
                  placeholder="e.g., 8"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Session Timeout (minutes)</label>
                <input
                  type="number"
                  value={settings.security.sessionTimeout}
                  onChange={(e) => updateSettings('security', 'sessionTimeout', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  title="Set the duration after which user sessions will automatically expire"
                  placeholder="e.g., 30"
                />
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
