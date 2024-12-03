'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CustomizationOptions } from '@/types/link-bio';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { ColorPicker } from '@/components/ui/color-picker';
import { CodeEditor } from '@/components/ui/code-editor';

interface CustomizationPanelProps {
  options: CustomizationOptions;
  onChange: (options: CustomizationOptions) => void;
}

export default function CustomizationPanel({
  options,
  onChange,
}: CustomizationPanelProps) {
  const [activeTab, setActiveTab] = useState('style');

  const updateOption = <K extends keyof CustomizationOptions>(
    key: K,
    value: CustomizationOptions[K]
  ) => {
    onChange({
      ...options,
      [key]: value,
    });
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-4 gap-4">
        <TabsTrigger value="style">Style</TabsTrigger>
        <TabsTrigger value="layout">Layout</TabsTrigger>
        <TabsTrigger value="effects">Effects</TabsTrigger>
        <TabsTrigger value="advanced">Advanced</TabsTrigger>
      </TabsList>

      <TabsContent value="style" className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label>Primary Color</Label>
            <ColorPicker
              color={options.primaryColor}
              onChange={(color) => updateOption('primaryColor', color)}
            />
          </div>

          <div>
            <Label>Secondary Color</Label>
            <ColorPicker
              color={options.secondaryColor}
              onChange={(color) => updateOption('secondaryColor', color)}
            />
          </div>

          <div>
            <Label>Background Color</Label>
            <ColorPicker
              color={options.backgroundColor}
              onChange={(color) => updateOption('backgroundColor', color)}
            />
          </div>

          <div>
            <Label>Font Family</Label>
            <Select
              value={options.fontFamily}
              onValueChange={(value) => updateOption('fontFamily', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Inter">Inter</SelectItem>
                <SelectItem value="Roboto">Roboto</SelectItem>
                <SelectItem value="Poppins">Poppins</SelectItem>
                <SelectItem value="Montserrat">Montserrat</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Border Style</Label>
            <Select
              value={options.borderStyle}
              onValueChange={(value) => updateOption('borderStyle', value as any)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="solid">Solid</SelectItem>
                <SelectItem value="dashed">Dashed</SelectItem>
                <SelectItem value="dotted">Dotted</SelectItem>
                <SelectItem value="double">Double</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="layout" className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label>Layout Type</Label>
            <Select
              value={options.layoutType}
              onValueChange={(value) => updateOption('layoutType', value as any)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stack">Stack</SelectItem>
                <SelectItem value="grid">Grid</SelectItem>
                <SelectItem value="masonry">Masonry</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Spacing</Label>
            <Select
              value={options.spacing}
              onValueChange={(value) => updateOption('spacing', value as any)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="compact">Compact</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="relaxed">Relaxed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Button Style</Label>
            <Select
              value={options.buttonStyle}
              onValueChange={(value) => updateOption('buttonStyle', value as any)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rounded">Rounded</SelectItem>
                <SelectItem value="square">Square</SelectItem>
                <SelectItem value="pill">Pill</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Icon Style</Label>
            <Select
              value={options.iconStyle}
              onValueChange={(value) => updateOption('iconStyle', value as any)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="minimal">Minimal</SelectItem>
                <SelectItem value="filled">Filled</SelectItem>
                <SelectItem value="duotone">Duotone</SelectItem>
                <SelectItem value="neon">Neon</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="effects" className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label>Background Effect</Label>
            <Select
              value={options.backgroundEffect}
              onValueChange={(value) => updateOption('backgroundEffect', value as any)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="gradient">Gradient</SelectItem>
                <SelectItem value="particles">Particles</SelectItem>
                <SelectItem value="mesh">Mesh</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Button Animation</Label>
            <Select
              value={options.buttonAnimation}
              onValueChange={(value) => updateOption('buttonAnimation', value as any)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="scale">Scale</SelectItem>
                <SelectItem value="slide">Slide</SelectItem>
                <SelectItem value="glow">Glow</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Animation Intensity</Label>
            <Select
              value={options.animationIntensity}
              onValueChange={(value) => updateOption('animationIntensity', value as any)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="subtle">Subtle</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label>Text Gradient</Label>
            <Switch
              checked={options.textGradient}
              onCheckedChange={(checked) => updateOption('textGradient', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>Glassmorphism</Label>
            <Switch
              checked={options.glassmorphism}
              onCheckedChange={(checked) => updateOption('glassmorphism', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>Neon Effects</Label>
            <Switch
              checked={options.neonEffects}
              onCheckedChange={(checked) => updateOption('neonEffects', checked)}
            />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="advanced" className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label>Custom CSS</Label>
            <CodeEditor
              value={options.customCss || ''}
              onChange={(value) => updateOption('customCss', value)}
              language="css"
              theme="vs-dark"
              height="200px"
            />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
