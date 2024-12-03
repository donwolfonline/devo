'use client';

import { useState } from 'react';
import { 
  Bell, 
  Shield, 
  Mail, 
  Database,
  Save,
  AlertCircle
} from 'lucide-react';

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [maintenanceUpdates, setMaintenanceUpdates] = useState(false);
  const [dataRetention, setDataRetention] = useState('30');

  const handleSave = () => {
    // Implement save functionality
    console.log('Settings saved');
  };

  const settingSections = [
    {
      title: 'Notifications',
      icon: Bell,
      description: 'Configure how you receive notifications',
      settings: [
        {
          name: 'Email Notifications',
          description: 'Receive email notifications for important updates',
          state: emailNotifications,
          setState: setEmailNotifications
        },
        {
          name: 'Security Alerts',
          description: 'Get notified about security-related events',
          state: securityAlerts,
          setState: setSecurityAlerts
        },
        {
          name: 'Maintenance Updates',
          description: 'Receive notifications about system maintenance',
          state: maintenanceUpdates,
          setState: setMaintenanceUpdates
        }
      ]
    },
    {
      title: 'Security',
      icon: Shield,
      description: 'Manage security preferences',
      settings: []
    },
    {
      title: 'Email',
      icon: Mail,
      description: 'Configure email settings',
      settings: []
    },
    {
      title: 'Data Management',
      icon: Database,
      description: 'Manage data retention and backup settings',
      content: (
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Data Retention Period
          </label>
          <select
            value={dataRetention}
            onChange={(e) => setDataRetention(e.target.value)}
            className="w-full bg-[#1a1a27] text-gray-200 rounded-lg border border-purple-500/10 px-4 py-2 focus:outline-none focus:border-purple-500/30"
          >
            <option value="7">7 days</option>
            <option value="30">30 days</option>
            <option value="90">90 days</option>
            <option value="180">180 days</option>
          </select>
          <p className="mt-2 text-sm text-gray-400">
            Choose how long to retain system data before automatic deletion
          </p>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <div className="p-8 md:p-10 max-w-[2000px] mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            System Settings
          </h1>
          <p className="mt-3 text-gray-400 text-lg">Configure system preferences and notifications</p>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {settingSections.map((section) => {
            const Icon = section.icon;
            return (
              <div
                key={section.title}
                className="bg-[#13131f] rounded-xl p-6 border border-purple-500/10"
              >
                <div className="flex items-start">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <Icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-xl font-semibold text-gray-200">{section.title}</h2>
                    <p className="mt-1 text-sm text-gray-400">{section.description}</p>
                  </div>
                </div>

                {section.settings?.length > 0 && (
                  <div className="mt-6 space-y-6">
                    {section.settings.map((setting) => (
                      <div key={setting.name} className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            type="checkbox"
                            checked={setting.state}
                            onChange={(e) => setting.setState(e.target.checked)}
                            className="h-4 w-4 rounded border-purple-500/30 text-purple-400 focus:ring-purple-500/20 bg-[#1a1a27]"
                          />
                        </div>
                        <div className="ml-3">
                          <label className="text-sm font-medium text-gray-200">
                            {setting.name}
                          </label>
                          <p className="text-sm text-gray-400">{setting.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {section.content && (
                  <div className="mt-6">
                    {section.content}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Save Button */}
        <div className="mt-8 flex items-center justify-end space-x-4">
          <div className="flex items-center text-yellow-400">
            <AlertCircle className="w-5 h-5 mr-2" />
            <span className="text-sm">Changes will take effect immediately</span>
          </div>
          <button
            onClick={handleSave}
            className="flex items-center px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            <Save className="w-5 h-5 mr-2" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
