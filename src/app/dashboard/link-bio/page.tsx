'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import MobilePreview from '@/components/link-bio/MobilePreview';
import { LinkBioProfile, TemplateStyle } from '@/types/link-bio';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ColorPicker } from '@/components/ui/color-picker';

const mockProfile: LinkBioProfile = {
  username: 'johndoe',
  subdomain: 'johndoe',
  name: 'John Doe',
  bio: 'Full-stack developer & open source contributor',
  avatar: '/placeholder-avatar.png',
  template: 'minimal',
  customization: {
    primaryColor: '#9333EA',
    secondaryColor: '#A855F7',
    backgroundColor: '#000000',
    fontFamily: 'Inter',
    buttonStyle: 'rounded',
    avatarStyle: 'circle',
  },
  socialLinks: [
    { platform: 'github', url: 'https://github.com/johndoe' },
    { platform: 'twitter', url: 'https://twitter.com/johndoe' },
    { platform: 'linkedin', url: 'https://linkedin.com/in/johndoe' },
    { platform: 'website', url: 'https://johndoe.com' },
  ],
  customLinks: [
    {
      id: '1',
      title: 'My Tech Blog',
      url: 'https://blog.johndoe.com',
      clicks: 0,
    },
    {
      id: '2',
      title: 'Latest Project',
      url: 'https://project.johndoe.com',
      clicks: 0,
    },
  ],
  analytics: {
    totalViews: 0,
    linkClicks: {},
  }
};

export default function LinkBioPage() {
  const [profile, setProfile] = useState<LinkBioProfile>(mockProfile);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSave = async () => {
    setIsLoading(true);
    setMessage('');

    try {
      // Simulate save operation
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage('Link Bio updated successfully!');
    } catch (error) {
      setMessage('Failed to update Link Bio. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6"
      >
        Link in Bio Editor
      </motion.h1>

      {message && (
        <div className={`
          p-4 rounded-lg mb-6 
          ${message.includes('success') 
            ? 'bg-green-500/10 text-green-600 border border-green-500/30'
            : 'bg-red-500/10 text-red-600 border border-red-500/30'
          }
        `}>
          {message}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {/* Preview Section */}
        <div>
          <MobilePreview profile={profile} />
        </div>

        {/* Edit Section */}
        <div>
          <Tabs defaultValue="profile">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="links">Links</TabsTrigger>
              <TabsTrigger value="design">Design</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <div className="space-y-4">
                <div>
                  <Label>Username</Label>
                  <Input 
                    value={profile.username}
                    onChange={(e) => setProfile(prev => ({
                      ...prev, 
                      username: e.target.value
                    }))}
                    placeholder="Your unique username"
                  />
                </div>
                <div>
                  <Label>Name</Label>
                  <Input 
                    value={profile.name}
                    onChange={(e) => setProfile(prev => ({
                      ...prev, 
                      name: e.target.value
                    }))}
                    placeholder="Your display name"
                  />
                </div>
                <div>
                  <Label>Bio</Label>
                  <Textarea 
                    value={profile.bio}
                    onChange={(e) => setProfile(prev => ({
                      ...prev, 
                      bio: e.target.value
                    }))}
                    placeholder="Tell people about yourself"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="links">
              <div className="space-y-4">
                {profile.socialLinks.map((link, index) => (
                  <div key={link.platform} className="flex space-x-2">
                    <Input 
                      value={link.url}
                      onChange={(e) => {
                        const newLinks = [...profile.socialLinks];
                        newLinks[index] = { ...newLinks[index], url: e.target.value };
                        setProfile(prev => ({ ...prev, socialLinks: newLinks }));
                      }}
                      placeholder={`${link.platform} URL`}
                    />
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="design">
              <div className="space-y-4">
                <div>
                  <Label>Primary Color</Label>
                  <ColorPicker 
                    color={profile.customization.primaryColor}
                    onChange={(color) => setProfile(prev => ({
                      ...prev,
                      customization: { 
                        ...prev.customization, 
                        primaryColor: color 
                      }
                    }))}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6">
            <Button 
              onClick={handleSave} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
