'use client';

import React, { createContext, useContext, useState } from 'react';

export type ColorScheme = 'blue' | 'purple' | 'green' | 'orange' | 'pink' | 'gradient' | 'custom' | 'minimal';
export type Typography = 'modern' | 'classic' | 'minimal' | 'tech' | 'elegant';
export type Layout = 'centered' | 'wide' | 'compact' | 'asymmetric' | 'grid';
export type Animation = 'subtle' | 'playful' | 'professional' | 'minimal' | 'dramatic' | 'techno' | 'glitch';
export type DevicePreview = 'desktop' | 'tablet' | 'mobile';
export type ContentDensity = 'comfortable' | 'compact' | 'spacious';
export type AccentStyle = 'solid' | 'gradient' | 'outline' | 'neon' | 'minimal';

interface CustomizationState {
  colorScheme: ColorScheme;
  typography: Typography;
  layout: Layout;
  animation: Animation;
  devicePreview: DevicePreview;
  contentDensity: ContentDensity;
  accentStyle: AccentStyle;
  darkMode: boolean;
  customColors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  spacing: {
    sections: number;
    elements: number;
  };
  borderRadius: number;
  shadowIntensity: number;
  templateSpecific?: {
    [key: string]: any;
  };
}

interface CustomizationContextType {
  state: CustomizationState;
  updateCustomization: (key: keyof CustomizationState, value: any) => void;
  resetCustomization: () => void;
  applyPreset: (presetName: string) => void;
  setTemplateSpecific: (key: string, value: any) => void;
}

const defaultState: CustomizationState = {
  colorScheme: 'blue',
  typography: 'modern',
  layout: 'centered',
  animation: 'subtle',
  devicePreview: 'desktop',
  contentDensity: 'comfortable',
  accentStyle: 'gradient',
  darkMode: false,
  customColors: {
    primary: '#3B82F6',
    secondary: '#6366F1',
    accent: '#F59E0B',
  },
  spacing: {
    sections: 1,
    elements: 1,
  },
  borderRadius: 0.5,
  shadowIntensity: 1,
  templateSpecific: {},
};

const presets = {
  minimal: {
    colorScheme: 'blue',
    typography: 'minimal',
    layout: 'centered',
    animation: 'subtle',
    contentDensity: 'spacious',
    accentStyle: 'solid',
    spacing: {
      sections: 1.2,
      elements: 0.8,
    },
    borderRadius: 0.25,
    shadowIntensity: 0.5,
  },
  modern: {
    colorScheme: 'gradient',
    typography: 'modern',
    layout: 'asymmetric',
    animation: 'playful',
    contentDensity: 'comfortable',
    accentStyle: 'gradient',
    spacing: {
      sections: 1,
      elements: 1,
    },
    borderRadius: 1,
    shadowIntensity: 1.5,
  },
  tech: {
    colorScheme: 'custom',
    typography: 'tech',
    layout: 'grid',
    animation: 'professional',
    contentDensity: 'compact',
    accentStyle: 'neon',
    customColors: {
      primary: '#10B981',
      secondary: '#059669',
      accent: '#34D399',
    },
    spacing: {
      sections: 0.8,
      elements: 1.2,
    },
    borderRadius: 0.125,
    shadowIntensity: 2,
  },
  elegant: {
    colorScheme: 'purple',
    typography: 'elegant',
    layout: 'centered',
    animation: 'minimal',
    contentDensity: 'spacious',
    accentStyle: 'outline',
    spacing: {
      sections: 1.5,
      elements: 1,
    },
    borderRadius: 0.75,
    shadowIntensity: 0.75,
  },
};

const templatePresets = {
  minimal: {
    customization: {
      colorScheme: 'blue',
      typography: 'minimal',
      layout: 'centered',
      animation: 'subtle',
      contentDensity: 'spacious',
      accentStyle: 'solid',
      spacing: {
        sections: 1.2,
        elements: 0.8,
      },
      borderRadius: 0.25,
      shadowIntensity: 0.5,
    },
  },
  modern: {
    customization: {
      colorScheme: 'gradient',
      typography: 'modern',
      layout: 'asymmetric',
      animation: 'playful',
      contentDensity: 'comfortable',
      accentStyle: 'gradient',
      spacing: {
        sections: 1,
        elements: 1,
      },
      borderRadius: 1,
      shadowIntensity: 1.5,
    },
  },
  tech: {
    customization: {
      colorScheme: 'custom',
      typography: 'tech',
      layout: 'grid',
      animation: 'professional',
      contentDensity: 'compact',
      accentStyle: 'neon',
      customColors: {
        primary: '#10B981',
        secondary: '#059669',
        accent: '#34D399',
      },
      spacing: {
        sections: 0.8,
        elements: 1.2,
      },
      borderRadius: 0.125,
      shadowIntensity: 2,
    },
  },
  elegant: {
    customization: {
      colorScheme: 'purple',
      typography: 'elegant',
      layout: 'centered',
      animation: 'minimal',
      contentDensity: 'spacious',
      accentStyle: 'outline',
      spacing: {
        sections: 1.5,
        elements: 1,
      },
      borderRadius: 0.75,
      shadowIntensity: 0.75,
    },
  },
};

const CustomizationContext = createContext<CustomizationContextType | undefined>(undefined);

export function CustomizationProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CustomizationState>(defaultState);

  const updateCustomization = (key: keyof CustomizationState, value: any) => {
    setState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetCustomization = () => {
    setState(defaultState);
  };

  const applyPreset = (presetName: string) => {
    const preset = templatePresets[presetName];
    if (preset) {
      setState((prev) => ({
        ...prev,
        ...preset.customization,
      }));
    }
  };

  const setTemplateSpecific = (key: string, value: any) => {
    setState((prev) => ({
      ...prev,
      templateSpecific: {
        ...prev.templateSpecific,
        [key]: value,
      },
    }));
  };

  return (
    <CustomizationContext.Provider
      value={{
        state,
        updateCustomization,
        resetCustomization,
        applyPreset,
        setTemplateSpecific,
      }}
    >
      {children}
    </CustomizationContext.Provider>
  );
}

export function useCustomization() {
  const context = useContext(CustomizationContext);
  if (context === undefined) {
    throw new Error('useCustomization must be used within a CustomizationProvider');
  }
  return context;
}
