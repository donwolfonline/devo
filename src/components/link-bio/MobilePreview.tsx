'use client';

import { motion } from 'framer-motion';
import { LinkBioProfile } from '@/types/link-bio';
import MinimalTemplate from './templates/MinimalTemplate';
import { useEffect, useState } from 'react';

interface MobilePreviewProps {
  profile: LinkBioProfile;
}

export default function MobilePreview({ profile }: MobilePreviewProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const templateComponents = {
    minimal: MinimalTemplate,
    // Add other templates here as they're created
  };

  const TemplateComponent = templateComponents[profile.template] || MinimalTemplate;

  return (
    <div className="relative w-[375px] h-[812px] rounded-[3rem] overflow-hidden bg-black">
      {/* Phone Frame */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 pointer-events-none"
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl" />
        
        {/* Time */}
        <div className="absolute top-1 left-8 text-white text-sm font-medium">
          9:41
        </div>
        
        {/* Status Icons */}
        <div className="absolute top-1 right-8 flex items-center space-x-2">
          <div className="w-6 h-3 bg-white rounded-sm" /> {/* Signal */}
          <div className="w-3 h-3 bg-white rounded-full" /> {/* WiFi */}
          <div className="w-6 h-3 bg-white rounded-sm" /> {/* Battery */}
        </div>
      </motion.div>

      {/* Content */}
      <div className="absolute inset-0 overflow-y-auto scrollbar-hide">
        <TemplateComponent profile={profile} />
      </div>
    </div>
  );
}
