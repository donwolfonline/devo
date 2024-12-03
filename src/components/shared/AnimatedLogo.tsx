'use client';

import { motion } from 'framer-motion';

interface AnimatedLogoProps {
  header?: boolean;
}

export default function AnimatedLogo({ header = false }: AnimatedLogoProps) {
  const textSize = header ? 'text-2xl sm:text-3xl md:text-4xl' : 'text-3xl md:text-4xl';
  
  return (
    <motion.div
      className="inline-block"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <span className={`${textSize} font-bold cursor-pointer whitespace-nowrap`}>
        <span className="animate-gradient bg-gradient-to-r from-purple-600 via-purple-400 to-purple-800 bg-clip-text text-transparent bg-300% glow-purple">
          Devo
        </span>
        <span className="text-white">
          Showcase
        </span>
      </span>
    </motion.div>
  );
}
