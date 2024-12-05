'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Shield, AlertTriangle, FileCheck, Clock } from 'lucide-react';
import DashboardHeading from '@/components/shared/DashboardHeading';
import { useAuthGuard } from '@/hooks/useAuthGuard';

interface SecurityMetrics {
  systemHealth: {
    score: number;
    status: string;
    lastUpdated: string;
  };
  activeAlerts: number;
  auditLogs: {
    status: string;
    totalCount: number;
    lastActivity: string;
  };
  uptime: {
    percentage: number;
    lastDowntime: string;
    measurementPeriod: number;
  };
  alerts: any[];
}

const SecurityToggle = ({ 
  label, 
  checked, 
  onChange 
}: { 
  label: string; 
  checked: boolean; 
  onChange: (checked: boolean) => void 
}) => (
  <div className="flex items-center justify-between">
    <span className="text-white text-sm font-medium">{label}</span>
    <label className="relative inline-flex items-center cursor-pointer">
      <input 
        type="checkbox" 
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only peer" 
        id={`security-toggle-${label.replace(/\s+/g, '-').toLowerCase()}`}
        aria-label={label}
      />
      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
    </label>
  </div>
);

function SecurityPage() {
  const { isAuthorized, isLoading } = useAuthGuard({
    role: 'SUPER_ADMIN',
    redirectTo: '/superadmin'
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthorized) {
    return null;
  }

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    passwordComplexity: true,
    ipWhitelisting: false,
    failedLoginLockout: true,
    sessionTimeout: true,
    auditLogging: true,
    encryptedStorage: true,
    concurrentSessions: false
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [sessionInfo, setSessionInfo] = useState<any>(null);
  const [metrics, setMetrics] = useState<SecurityMetrics | null>(null);
  const [resolvingAlert, setResolvingAlert] = useState<string | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/api/security/settings', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });
        
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Failed to fetch settings');
        }
        
        const data = await response.json();
        if (data.settings) {
          setSecuritySettings(data.settings);
        }
      } catch (error: any) {
        console.error('Error fetching settings:', error);
        setError(error.message || 'Failed to load security settings');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const response = await fetch('/api/auth/me');
        const data = await response.json();
        console.log('Current user:', data);
        
        if (data.role !== 'SUPER_ADMIN') {
          console.error('User is not a SUPER_ADMIN. Current role:', data.role);
        }
      } catch (error) {
        console.error('Error checking user role:', error);
      }
    };

    checkUserRole();
  }, []);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('/api/auth/session');
        const session = await response.json();
        console.log('Current session:', session);
        setSessionInfo(session);
      } catch (error) {
        console.error('Error fetching session:', error);
      }
    };

    checkSession();
  }, []);

  const handleSaveSettings = async () => {
    try {
      setSaving(true);
      setError(null);
      setSuccess(null);
      
      const response = await fetch('/api/security/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(securitySettings),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to save settings');
      }

      setSuccess('Settings saved successfully');
    } catch (error: any) {
      console.error('Error saving settings:', error);
      setError(error.message || 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const handleSettingChange = (setting: keyof typeof securitySettings, checked: boolean) => {
    setSecuritySettings(prev => ({
      ...prev,
      [setting]: checked
    }));
  };

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/security/metrics');
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch security metrics');
      }
      const data = await response.json();
      setMetrics(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching metrics:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      // Retry up to 3 times with exponential backoff
      if (retryCount < 3) {
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
        }, Math.pow(2, retryCount) * 1000);
      }
    } finally {
      setLoading(false);
    }
  };

  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    fetchMetrics();
  }, [retryCount]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'auth':
        return <Shield className="text-purple-500" size={24} />;
      case 'system':
        return <AlertTriangle className="text-yellow-500" size={24} />;
      case 'network':
        return <FileCheck className="text-blue-500" size={24} />;
      default:
        return <Clock className="text-purple-500" size={24} />;
    }
  };

  const getEventColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-500/10 text-red-400';
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-400';
      default:
        return 'bg-blue-500/10 text-blue-400';
    }
  };

  const handleResolveAlert = async (alertId: string) => {
    try {
      setResolvingAlert(alertId);
      setError(null);
      
      const response = await fetch('/api/security/alerts/resolve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ alertId }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to resolve alert');
      }

      const data = await response.json();
      setMetrics(data.metrics);
      setSuccess('Alert resolved successfully');
      
      // Refresh metrics after resolution
      fetchMetrics();
    } catch (error) {
      console.error('Error resolving alert:', error);
      setError(error instanceof Error ? error.message : 'Failed to resolve alert');
    } finally {
      setResolvingAlert(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-500/10 text-red-400 p-4 rounded-lg mt-4">
          {error}
          {retryCount < 3 && (
            <button
              onClick={() => setRetryCount(prev => prev + 1)}
              className="ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Retry
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <DashboardHeading 
        title="Security Center" 
        subtitle="Monitor and manage system security" 
      />

      {/* Debug Session Info */}
      {sessionInfo && (
        <div className="mb-4 p-6 bg-[#1a1a24] rounded-xl border border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <svg
              className="w-5 h-5 text-purple-500"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            <h3 className="text-lg font-semibold text-white">Session Status</h3>
          </div>
          <div className="space-y-2 text-sm text-gray-400">
            <div className="flex justify-between items-center">
              <span>User:</span>
              <span className="text-white">{sessionInfo.user.username}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Role:</span>
              <span className="text-purple-400">{sessionInfo.user.role}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Email:</span>
              <span className="text-white">{sessionInfo.user.email}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Status:</span>
              <span className="text-green-400">Active</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Expires:</span>
              <span className="text-yellow-400">
                {new Date(sessionInfo.expires).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      )}
      
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
          {success}
        </div>
      )}

      {/* Security Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-6">
        {/* System Health Card */}
        <div className="bg-[#1a1a24] rounded-xl border border-gray-800/50 shadow-lg hover:border-purple-500/20 transition-all duration-300">
          <div className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">System Health</h3>
                  <p className="text-sm text-gray-400">All systems normal</p>
                </div>
              </div>
              <span className="text-xl font-bold text-green-500">96%</span>
            </div>
          </div>
        </div>

        {/* Active Alerts Card */}
        <div className="bg-[#1a1a24] rounded-xl border border-gray-800/50 shadow-lg hover:border-purple-500/20 transition-all duration-300">
          <div className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-500/10 rounded-lg">
                  <svg className="w-6 h-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Active Alerts</h3>
                  <p className="text-sm text-gray-400">Needs attention</p>
                </div>
              </div>
              <span className="text-xl font-bold text-yellow-500">2</span>
            </div>
          </div>
        </div>

        {/* Audit Logs Card */}
        <div className="bg-[#1a1a24] rounded-xl border border-gray-800/50 shadow-lg hover:border-purple-500/20 transition-all duration-300">
          <div className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Audit Logs</h3>
                  <p className="text-sm text-gray-400">24/7 monitoring</p>
                </div>
              </div>
              <span className="text-xl font-bold text-blue-500">3</span>
            </div>
          </div>
        </div>

        {/* Uptime Card */}
        <div className="bg-[#1a1a24] rounded-xl border border-gray-800/50 shadow-lg hover:border-purple-500/20 transition-all duration-300">
          <div className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <svg className="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">System Uptime</h3>
                  <p className="text-sm text-gray-400">Last 30 days</p>
                </div>
              </div>
              <span className="text-xl font-bold text-purple-500">98.3%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {/* Session Status Card */}
        {sessionInfo && (
          <div className="bg-[#1a1a24] rounded-xl border border-gray-800/50 shadow-lg hover:border-purple-500/20 transition-all duration-300">
            <div className="p-5">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <svg className="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white">Session Status</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-800/50">
                  <span className="text-gray-400">User</span>
                  <span className="text-white font-medium">{sessionInfo.user.username}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-800/50">
                  <span className="text-gray-400">Role</span>
                  <span className="text-purple-400 font-medium">{sessionInfo.user.role}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-800/50">
                  <span className="text-gray-400">Email</span>
                  <span className="text-white font-medium">{sessionInfo.user.email}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-800/50">
                  <span className="text-gray-400">Status</span>
                  <span className="text-green-400 font-medium">Active</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-400">Expires</span>
                  <span className="text-yellow-400 font-medium">
                    {new Date(sessionInfo.expires).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings Cards */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          {/* Password & Authentication */}
          <div className="bg-[#1a1a24] rounded-xl border border-gray-800/50 shadow-lg hover:border-purple-500/20 transition-all duration-300">
            <div className="p-5">
              <h3 className="text-lg font-semibold text-white mb-4">Password & Authentication</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-gray-400">Two-Factor Authentication</label>
                  <SecurityToggle 
                    label="Two-Factor Auth"
                    checked={securitySettings.twoFactorAuth}
                    onChange={(checked) => handleSettingChange('twoFactorAuth', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-gray-400">Password Complexity</label>
                  <SecurityToggle 
                    label="Password Rules"
                    checked={securitySettings.passwordComplexity}
                    onChange={(checked) => handleSettingChange('passwordComplexity', checked)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Session Management */}
          <div className="bg-[#1a1a24] rounded-xl border border-gray-800/50 shadow-lg hover:border-purple-500/20 transition-all duration-300">
            <div className="p-5">
              <h3 className="text-lg font-semibold text-white mb-4">Session Management</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-gray-400">Session Timeout</label>
                  <SecurityToggle 
                    label="Auto Logout"
                    checked={securitySettings.sessionTimeout}
                    onChange={(checked) => handleSettingChange('sessionTimeout', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-gray-400">Concurrent Sessions</label>
                  <SecurityToggle 
                    label="Multiple Sessions"
                    checked={!securitySettings.concurrentSessions}
                    onChange={(checked) => handleSettingChange('concurrentSessions', !checked)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-6 flex justify-end">
        {error && (
          <div className="text-red-500 mr-auto">{error}</div>
        )}
        {success && (
          <div className="text-green-500 mr-auto">{success}</div>
        )}
        <button
          onClick={handleSaveSettings}
          disabled={saving}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {/* Recent Security Events */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-white mb-4">Recent Security Events</h2>
        <div className="space-y-4">
          {metrics?.alerts?.filter(alert => alert.status !== 'resolved').map((alert) => (
            <div key={alert._id} className="bg-[#1a1a24] rounded-xl border border-gray-800 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-red-500/10 rounded-lg">
                    <AlertTriangle className="text-red-500" size={20} />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{alert.message}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-red-400 text-sm">critical</span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-400 text-sm">
                        {new Date(alert.timestamp).toLocaleString()}
                      </span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-400 text-sm">Type: {alert.type}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleResolveAlert(alert._id)}
                  disabled={resolvingAlert === alert._id}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    resolvingAlert === alert._id
                      ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                      : 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
                  }`}
                >
                  {resolvingAlert === alert._id ? 'Resolving...' : 'Resolve'}
                </button>
              </div>
            </div>
          ))}
          {(!metrics?.alerts || metrics.alerts.length === 0) && (
            <div className="text-gray-400 text-center py-8">
              No active security events
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end mt-6 space-x-4">
        <button 
          onClick={async () => {
            try {
              await fetch('/api/security/simulate', {
                method: 'POST'
              });
              // Refresh metrics immediately after simulation
              await fetchMetrics();
            } catch (err) {
              console.error('Error simulating security event:', err);
            }
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors"
        >
          Simulate Event
        </button>
      </div>
    </div>
  );
}

export default SecurityPage;
