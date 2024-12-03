export type LinkType = {
  id: string;
  title: string;
  url: string;
  icon?: string;
  clicks?: number;
};

export type SocialPlatform = 'github' | 'twitter' | 'linkedin' | 'youtube' | 'instagram' | 'website' | 'email';

export type TemplateStyle = 'minimal' | 'gradient' | 'glassmorphism' | 'cyberpunk';

export interface CustomizationOptions {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  fontFamily: string;
  buttonStyle: 'rounded' | 'square' | 'pill';
  avatarStyle: 'circle' | 'square' | 'rounded';
  buttonAnimation: 'none' | 'scale' | 'slide' | 'glow';
  backgroundEffect: 'none' | 'gradient' | 'particles' | 'mesh';
  textGradient: boolean;
  glassmorphism: boolean;
  neonEffects: boolean;
  borderStyle: 'none' | 'solid' | 'dashed' | 'dotted' | 'double';
  spacing: 'compact' | 'normal' | 'relaxed';
  iconStyle: 'minimal' | 'filled' | 'duotone' | 'neon';
  layoutType: 'stack' | 'grid' | 'masonry';
  animationIntensity: 'none' | 'subtle' | 'medium' | 'high';
  customCss?: string;
}

export interface LinkBioProfile {
  username: string;
  subdomain: string;
  name: string;
  bio: string;
  avatar: string;
  template: TemplateStyle;
  customization: CustomizationOptions;
  socialLinks: {
    platform: SocialPlatform;
    url: string;
  }[];
  customLinks: LinkType[];
  analytics: {
    totalViews: number;
    linkClicks: Record<string, number>;
  };
  location?: {
    latitude: number;
    longitude: number;
    address: string;
  };
}
