import { CustomizationState } from '@/context/CustomizationContext';

export interface TemplatePreset {
  name: string;
  description: string;
  preview: string;
  customization: Partial<CustomizationState>;
}

export const templatePresets: Record<string, TemplatePreset[]> = {
  minimal: [
    {
      name: 'Clean Slate',
      description: 'Pure minimalism with perfect whitespace',
      preview: '/presets/minimal-clean.png',
      customization: {
        colorScheme: 'minimal',
        typography: 'minimal',
        layout: 'centered',
        animation: 'minimal',
        contentDensity: 'spacious',
        accentStyle: 'solid',
        spacing: { sections: 1.5, elements: 1 },
        borderRadius: 0.25,
        shadowIntensity: 0,
      },
    },
    {
      name: 'Soft Touch',
      description: 'Subtle shadows and gentle transitions',
      preview: '/presets/minimal-soft.png',
      customization: {
        colorScheme: 'blue',
        typography: 'minimal',
        layout: 'centered',
        animation: 'subtle',
        contentDensity: 'comfortable',
        accentStyle: 'gradient',
        spacing: { sections: 1.2, elements: 1 },
        borderRadius: 0.5,
        shadowIntensity: 0.5,
      },
    },
  ],
  modern: [
    {
      name: 'Bold & Dynamic',
      description: 'Strong contrasts with modern aesthetics',
      preview: '/presets/modern-bold.png',
      customization: {
        colorScheme: 'custom',
        typography: 'modern',
        layout: 'asymmetric',
        animation: 'dramatic',
        contentDensity: 'compact',
        accentStyle: 'neon',
        customColors: {
          primary: '#2563EB',
          secondary: '#7C3AED',
          accent: '#F59E0B',
        },
        spacing: { sections: 1, elements: 1.2 },
        borderRadius: 1,
        shadowIntensity: 1.5,
      },
    },
    {
      name: 'Neo Brutalism',
      description: 'Raw, bold, and unapologetic design',
      preview: '/presets/modern-neo.png',
      customization: {
        colorScheme: 'custom',
        typography: 'tech',
        layout: 'grid',
        animation: 'dramatic',
        contentDensity: 'compact',
        accentStyle: 'solid',
        customColors: {
          primary: '#000000',
          secondary: '#FF3B30',
          accent: '#FFE800',
        },
        spacing: { sections: 0.8, elements: 1.5 },
        borderRadius: 0,
        shadowIntensity: 2,
      },
    },
  ],
  creative: [
    {
      name: 'Playful Pop',
      description: 'Vibrant colors and playful animations',
      preview: '/presets/creative-pop.png',
      customization: {
        colorScheme: 'gradient',
        typography: 'modern',
        layout: 'asymmetric',
        animation: 'playful',
        contentDensity: 'comfortable',
        accentStyle: 'gradient',
        spacing: { sections: 1.2, elements: 1.2 },
        borderRadius: 1.5,
        shadowIntensity: 1,
      },
    },
    {
      name: 'Artistic Flow',
      description: 'Organic shapes and smooth transitions',
      preview: '/presets/creative-flow.png',
      customization: {
        colorScheme: 'custom',
        typography: 'elegant',
        layout: 'wide',
        animation: 'dramatic',
        contentDensity: 'spacious',
        accentStyle: 'gradient',
        customColors: {
          primary: '#FF6B6B',
          secondary: '#4ECDC4',
          accent: '#FFE66D',
        },
        spacing: { sections: 1.5, elements: 1.3 },
        borderRadius: 2,
        shadowIntensity: 0.75,
      },
    },
  ],
  tech: [
    {
      name: 'Matrix',
      description: 'Digital rain and neon accents',
      preview: '/presets/tech-matrix.png',
      customization: {
        colorScheme: 'custom',
        typography: 'tech',
        layout: 'grid',
        animation: 'techno',
        contentDensity: 'compact',
        accentStyle: 'neon',
        customColors: {
          primary: '#00FF41',
          secondary: '#008F11',
          accent: '#003B00',
        },
        spacing: { sections: 0.8, elements: 1 },
        borderRadius: 0.125,
        shadowIntensity: 2,
      },
    },
    {
      name: 'Cyberpunk',
      description: 'High contrast with glitch effects',
      preview: '/presets/tech-cyber.png',
      customization: {
        colorScheme: 'custom',
        typography: 'tech',
        layout: 'asymmetric',
        animation: 'glitch',
        contentDensity: 'compact',
        accentStyle: 'neon',
        customColors: {
          primary: '#FF00FF',
          secondary: '#00FFFF',
          accent: '#FFFF00',
        },
        spacing: { sections: 1, elements: 1.2 },
        borderRadius: 0,
        shadowIntensity: 2.5,
      },
    },
  ],
  portfolioPlus: [
    {
      name: 'Professional Elite',
      description: 'Sophisticated and polished look',
      preview: '/presets/plus-pro.png',
      customization: {
        colorScheme: 'custom',
        typography: 'elegant',
        layout: 'centered',
        animation: 'professional',
        contentDensity: 'comfortable',
        accentStyle: 'gradient',
        customColors: {
          primary: '#1E293B',
          secondary: '#334155',
          accent: '#0EA5E9',
        },
        spacing: { sections: 1.2, elements: 1 },
        borderRadius: 0.75,
        shadowIntensity: 0.5,
      },
    },
    {
      name: 'Creative Professional',
      description: 'Balance of creativity and professionalism',
      preview: '/presets/plus-creative.png',
      customization: {
        colorScheme: 'gradient',
        typography: 'modern',
        layout: 'asymmetric',
        animation: 'dramatic',
        contentDensity: 'spacious',
        accentStyle: 'outline',
        spacing: { sections: 1.3, elements: 1.2 },
        borderRadius: 1,
        shadowIntensity: 1,
      },
    },
  ],
};
