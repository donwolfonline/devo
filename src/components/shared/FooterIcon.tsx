import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FooterIconProps {
  Icon: LucideIcon;
  href: string;
  label: string;
}

const FooterIcon = ({ Icon, href, label }: FooterIconProps) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative group"
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.2 }}
      aria-label={label}
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-purple-800/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <Icon 
        className="w-6 h-6 relative footer-icon-glow text-gray-400 group-hover:text-purple-400 
                 transition-all duration-300 group-hover:footer-icon-gradient"
        strokeWidth={1.5}
      />
    </motion.a>
  );
};

export default FooterIcon;
