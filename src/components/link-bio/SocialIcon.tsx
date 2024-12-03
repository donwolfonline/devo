'use client';

import { SocialPlatform } from '@/types/link-bio';
import { Github, Twitter, Linkedin, Youtube, Instagram, Globe, Mail } from 'lucide-react';

interface SocialIconProps {
  platform: SocialPlatform;
  className?: string;
}

const iconMap = {
  github: Github,
  twitter: Twitter,
  linkedin: Linkedin,
  youtube: Youtube,
  instagram: Instagram,
  website: Globe,
  email: Mail,
};

export function SocialIcon({ platform, className = 'w-5 h-5' }: SocialIconProps) {
  const Icon = iconMap[platform];
  return <Icon className={className} />;
}
