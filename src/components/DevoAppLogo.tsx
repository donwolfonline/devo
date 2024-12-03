import React from 'react';
import { motion } from 'framer-motion';

const DevoShowcaseLogo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 300 120"
      className={className}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ 
        scale: [0.8, 1.1, 1],
        opacity: 1,
        rotate: [0, 5, -5, 0]
      }}
      transition={{
        duration: 1,
        type: "spring",
        stiffness: 300,
        damping: 10
      }}
    >
      {/* Background Rectangle */}
      <motion.rect
        x="10"
        y="10"
        width="280"
        height="100"
        rx="20"
        ry="20"
        fill="url(#purpleGradient)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5 }}
      />

      {/* Gradient Definition */}
      <defs>
        <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8A4FFF" />
          <stop offset="100%" stopColor="#5D3FD3" />
        </linearGradient>
      </defs>

      {/* Opening Bracket */}
      <motion.path
        d="M40 35 L30 60 L40 85"
        stroke="white"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ 
          pathLength: 1, 
          opacity: 1
        }}
        transition={{ 
          duration: 1,
          delay: 0.5
        }}
      />

      {/* Closing Bracket */}
      <motion.path
        d="M260 35 L270 60 L260 85"
        stroke="white"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ 
          pathLength: 1, 
          opacity: 1
        }}
        transition={{ 
          duration: 1,
          delay: 0.5
        }}
      />

      {/* Forward Slash */}
      <motion.path
        d="M265 35 L275 85"
        stroke="white"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ 
          pathLength: 1, 
          opacity: 1
        }}
        transition={{ 
          duration: 0.5,
          delay: 0.7
        }}
      />

      {/* DevoShowcase Text */}
      <motion.text
        x="150"
        y="65"
        textAnchor="middle"
        fill="white"
        fontSize="28"
        fontWeight="bold"
        initial={{ opacity: 0, y: 10 }}
        animate={{ 
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.5,
          delay: 1
        }}
      >
        DevoShowcase
      </motion.text>
    </motion.svg>
  );
};

export default DevoShowcaseLogo;
