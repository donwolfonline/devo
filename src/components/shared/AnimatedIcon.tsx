'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface AnimatedIconProps {
  icon: LucideIcon;
}

export default function AnimatedIcon({ icon: Icon }: AnimatedIconProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      className="relative group"
    >
      <Icon 
        className="w-8 h-8 mx-auto relative z-10 stroke-purple-500 group-hover:stroke-purple-400 transition-colors duration-300"
        style={{
          filter: 'drop-shadow(0 0 8px rgba(147, 51, 234, 0.5))',
        }}
      />
    </motion.div>
  );
}
