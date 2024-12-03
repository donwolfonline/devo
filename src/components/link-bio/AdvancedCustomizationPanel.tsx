'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Palette,
  Type,
  Layout,
  Box,
  Sparkles,
  Wand2,
  Layers,
  Code,
} from 'lucide-react';
import { LinkBioProfile } from '@/types/link-bio';

interface AdvancedCustomizationPanelProps {
  profile: LinkBioProfile;
  onUpdate: (updates: Partial<LinkBioProfile['customization']>) => void;
}

export default function AdvancedCustomizationPanel({
  profile,
  onUpdate,
}: AdvancedCustomizationPanelProps) {
  const [activeTab, setActiveTab] = useState('style');
  const [cssError, setCssError] = useState('');

  const validateCSS = (css: string) => {
    try {
      const style = document.createElement('style');
      style.textContent = css;
      document.head.appendChild(style);
      document.head.removeChild(style);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleCustomCSSChange = (css: string) => {
    if (validateCSS(css)) {
      setCssError('');
      onUpdate({ customCSS: css });
    } else {
      setCssError('Invalid CSS syntax');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 gap-4 mb-6">
          <TabsTrigger value="style" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Style
          </TabsTrigger>
          <TabsTrigger value="layout" className="flex items-center gap-2">
            <Layout className="w-4 h-4" />
            Layout
          </TabsTrigger>
          <TabsTrigger value="effects" className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Effects
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center gap-2">
            <Code className="w-4 h-4" />
            Advanced
          </TabsTrigger>
        </TabsList>

        <TabsContent value="style">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Primary Color
                </label>
                <Input
                  type="color"
                  value={profile.customization.primaryColor}
                  onChange={(e) => onUpdate({ primaryColor: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Secondary Color
                </label>
                <Input
                  type="color"
                  value={profile.customization.secondaryColor}
                  onChange={(e) => onUpdate({ secondaryColor: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Font Family
              </label>
              <select
                className="w-full p-2 border rounded"
                value={profile.customization.fontFamily}
                onChange={(e) => onUpdate({ fontFamily: e.target.value })}
              >
                <option value="Inter">Inter</option>
                <option value="Roboto">Roboto</option>
                <option value="Poppins">Poppins</option>
                <option value="Montserrat">Montserrat</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Button Style
              </label>
              <div className="grid grid-cols-3 gap-4">
                {['rounded', 'square', 'pill'].map((style) => (
                  <Button
                    key={style}
                    variant={profile.customization.buttonStyle === style ? 'default' : 'outline'}
                    onClick={() => onUpdate({ buttonStyle: style })}
                    className="capitalize"
                  >
                    {style}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="layout">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Layout Type
              </label>
              <div className="grid grid-cols-2 gap-4">
                {['stack', 'grid', 'masonry'].map((type) => (
                  <Button
                    key={type}
                    variant={profile.customization.layoutType === type ? 'default' : 'outline'}
                    onClick={() => onUpdate({ layoutType: type })}
                    className="capitalize"
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Spacing
              </label>
              <Slider
                value={[profile.customization.spacing === 'compact' ? 0 : profile.customization.spacing === 'normal' ? 50 : 100]}
                min={0}
                max={100}
                step={50}
                onValueChange={(value) => {
                  const spacing = value[0] === 0 ? 'compact' : value[0] === 50 ? 'normal' : 'relaxed';
                  onUpdate({ spacing });
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Container Width
              </label>
              <Slider
                value={[parseInt(profile.customization.containerWidth || '600')]}
                min={400}
                max={1200}
                step={100}
                onValueChange={(value) => onUpdate({ containerWidth: value[0].toString() })}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="effects">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Animation Intensity
              </label>
              <div className="grid grid-cols-3 gap-4">
                {['subtle', 'medium', 'high'].map((intensity) => (
                  <Button
                    key={intensity}
                    variant={profile.customization.animationIntensity === intensity ? 'default' : 'outline'}
                    onClick={() => onUpdate({ animationIntensity: intensity })}
                    className="capitalize"
                  >
                    {intensity}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Glassmorphism</label>
                <Switch
                  checked={profile.customization.glassmorphism}
                  onCheckedChange={(checked) => onUpdate({ glassmorphism: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Text Gradient</label>
                <Switch
                  checked={profile.customization.textGradient}
                  onCheckedChange={(checked) => onUpdate({ textGradient: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Neon Effects</label>
                <Switch
                  checked={profile.customization.neonEffects}
                  onCheckedChange={(checked) => onUpdate({ neonEffects: checked })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Background Effect
              </label>
              <select
                className="w-full p-2 border rounded"
                value={profile.customization.backgroundEffect}
                onChange={(e) => onUpdate({ backgroundEffect: e.target.value })}
              >
                <option value="none">None</option>
                <option value="gradient">Gradient</option>
                <option value="particles">Particles</option>
                <option value="waves">Waves</option>
                <option value="mesh">Mesh</option>
              </select>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="advanced">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Custom CSS
              </label>
              <textarea
                className="w-full h-40 p-2 font-mono text-sm border rounded"
                value={profile.customization.customCSS}
                onChange={(e) => handleCustomCSSChange(e.target.value)}
                placeholder=".custom-style { ... }"
              />
              {cssError && (
                <p className="text-red-500 text-sm mt-1">{cssError}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Custom HTML Attributes
              </label>
              <Input
                type="text"
                value={profile.customization.customAttributes}
                onChange={(e) => onUpdate({ customAttributes: e.target.value })}
                placeholder="data-custom='value'"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Meta Tags
              </label>
              <textarea
                className="w-full h-20 p-2 font-mono text-sm border rounded"
                value={profile.customization.metaTags}
                onChange={(e) => onUpdate({ metaTags: e.target.value })}
                placeholder="<meta name='description' content='...'>"
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
