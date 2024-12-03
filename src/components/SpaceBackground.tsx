'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// Generate star positions
const generateStars = (count: number) => {
  return Array.from({ length: count }).map(() => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    duration: 2 + Math.random() * 2,
    delay: Math.random() * 2,
  }));
};

export const SpaceBackground = () => {
  const [stars, setStars] = useState<Array<{ left: string; top: string; duration: number; delay: number }>>([]);

  useEffect(() => {
    setStars(generateStars(50));
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden">
      {/* Dark base with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/20 via-black to-purple-950/20" />
      
      {/* Main nebula effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(88, 28, 135, 0.4), transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Secondary nebula clouds */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 30% 70%, rgba(147, 51, 234, 0.3), transparent 60%)',
          filter: 'blur(40px)',
        }}
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Stars */}
      {stars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: star.left,
            top: star.top,
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: star.delay,
          }}
        />
      ))}

      {/* Glowing orbs */}
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: 200,
            height: 200,
            left: `${20 + (i * 30)}%`,
            top: `${30 + (i * 20)}%`,
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 70%)',
            filter: 'blur(30px)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 2,
          }}
        />
      ))}
    </div>
  );
};
