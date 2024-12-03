import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface SocialIconProps {
  Icon: LucideIcon;
  href: string;
  label: string;
}

export default function SocialIcon({ Icon, href, label }: SocialIconProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative group"
      whileHover={{ scale: 1.1 }}
      aria-label={label}
    >
      <div className="absolute inset-0 bg-purple-600/20 rounded-full blur-lg group-hover:bg-purple-500/30 transition-all duration-300" />
      <Icon
        className="w-6 h-6 relative z-10 text-gray-400 group-hover:text-purple-400 transition-colors duration-300
                 [filter:drop-shadow(0_0_8px_rgba(147,51,234,0.5))] group-hover:[filter:drop-shadow(0_0_12px_rgba(168,85,247,0.7))]"
        strokeWidth={1.5}
      />
    </motion.a>
  );
}
