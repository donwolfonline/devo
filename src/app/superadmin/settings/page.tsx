'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export default function AdminSettings() {
  const [siteSettings, setSiteSettings] = useState({
    siteName: 'DevoApp',
    siteDescription: 'Developer Portfolio Platform',
    maintenanceMode: false,
    requireEmailVerification: true,
    allowUserRegistration: true,
  });

  const [emailSettings, setEmailSettings] = useState({
    smtpHost: '',
    smtpPort: '',
    smtpUser: '',
    smtpPassword: '',
    fromEmail: '',
  });

  const handleSiteSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement site settings update
    console.log('Updating site settings:', siteSettings);
  };

  const handleEmailSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement email settings update
    console.log('Updating email settings:', emailSettings);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Site Settings</h1>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card className="p-6">
            <form onSubmit={handleSiteSettingsSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="siteName">Site Name</Label>
                <Input
                  id="siteName"
                  value={siteSettings.siteName}
                  onChange={(e) =>
                    setSiteSettings({ ...siteSettings, siteName: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Input
                  id="siteDescription"
                  value={siteSettings.siteDescription}
                  onChange={(e) =>
                    setSiteSettings({ ...siteSettings, siteDescription: e.target.value })
                  }
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="maintenanceMode"
                  checked={siteSettings.maintenanceMode}
                  onCheckedChange={(checked) =>
                    setSiteSettings({ ...siteSettings, maintenanceMode: checked })
                  }
                />
                <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
              </div>

              <Button type="submit">Save Changes</Button>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="email">
          <Card className="p-6">
            <form onSubmit={handleEmailSettingsSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="smtpHost">SMTP Host</Label>
                <Input
                  id="smtpHost"
                  value={emailSettings.smtpHost}
                  onChange={(e) =>
                    setEmailSettings({ ...emailSettings, smtpHost: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="smtpPort">SMTP Port</Label>
                <Input
                  id="smtpPort"
                  value={emailSettings.smtpPort}
                  onChange={(e) =>
                    setEmailSettings({ ...emailSettings, smtpPort: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="smtpUser">SMTP Username</Label>
                <Input
                  id="smtpUser"
                  value={emailSettings.smtpUser}
                  onChange={(e) =>
                    setEmailSettings({ ...emailSettings, smtpUser: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="smtpPassword">SMTP Password</Label>
                <Input
                  id="smtpPassword"
                  type="password"
                  value={emailSettings.smtpPassword}
                  onChange={(e) =>
                    setEmailSettings({ ...emailSettings, smtpPassword: e.target.value })
                  }
                />
              </div>

              <Button type="submit">Save Email Settings</Button>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="requireEmailVerification"
                  checked={siteSettings.requireEmailVerification}
                  onCheckedChange={(checked) =>
                    setSiteSettings({ ...siteSettings, requireEmailVerification: checked })
                  }
                />
                <Label htmlFor="requireEmailVerification">
                  Require Email Verification
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="allowUserRegistration"
                  checked={siteSettings.allowUserRegistration}
                  onCheckedChange={(checked) =>
                    setSiteSettings({ ...siteSettings, allowUserRegistration: checked })
                  }
                />
                <Label htmlFor="allowUserRegistration">Allow User Registration</Label>
              </div>

              <Button onClick={() => console.log('Clear cache')}>Clear Site Cache</Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
