import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect } from 'react';

// Predefined positions for stars to avoid hydration mismatch
const starPositions = [
  { left: 10, top: 15 }, { left: 20, top: 45 }, { left: 30, top: 75 },
  { left: 40, top: 25 }, { left: 50, top: 85 }, { left: 60, top: 35 },
  { left: 70, top: 65 }, { left: 80, top: 15 }, { left: 90, top: 45 },
  { left: 15, top: 55 }, { left: 25, top: 85 }, { left: 35, top: 25 },
  { left: 45, top: 75 }, { left: 55, top: 35 }, { left: 65, top: 95 },
  { left: 75, top: 45 }, { left: 85, top: 65 }, { left: 95, top: 15 },
  { left: 5, top: 35 }, { left: 15, top: 85 }, { left: 25, top: 55 },
  { left: 35, top: 15 }, { left: 45, top: 95 }, { left: 55, top: 45 },
  { left: 65, top: 25 }, { left: 75, top: 75 }, { left: 85, top: 35 },
  { left: 95, top: 85 }, { left: 5, top: 65 }, { left: 15, top: 25 }
];

// Predefined positions for orbs
const orbPositions = [
  { left: 20, top: 30, delay: 0 },
  { left: 50, top: 50, delay: 2 },
  { left: 80, top: 20, delay: 4 },
  { left: 30, top: 70, delay: 6 }
];

export const ExploreBackground = () => {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/10 via-black to-purple-900/10" />
      
      {/* Glowing orbs */}
      {orbPositions.map((orb, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute pointer-events-none"
          style={{
            width: 500,
            height: 500,
            left: `${orb.left}%`,
            top: `${orb.top}%`,
            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.4) 0%, transparent 70%)',
            filter: 'blur(60px)',
            zIndex: 2,
            mixBlendMode: 'screen'
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}

      {/* Stars */}
      {starPositions.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-purple-300 rounded-full pointer-events-none"
          style={{
            left: `${pos.left}%`,
            top: `${pos.top}%`,
            zIndex: 3,
            mixBlendMode: 'screen'
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );
};
