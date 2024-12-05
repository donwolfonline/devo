'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// Seeded random number generator
const seededRandom = (seed: number) => {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
};

// Generate positions using seed
const generatePositions = (count: number) => {
  const positions = [];
  for (let i = 0; i < count; i++) {
    positions.push({
      left: `${seededRandom(i * 2) * 100}%`,
      top: `${seededRandom(i * 2 + 1) * 100}%`,
      delay: `${-i * 0.5}s`
    });
  }
  return positions;
};

const MouseFollower = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50 mix-blend-screen"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        background: 'radial-gradient(circle, rgba(168,85,247,0.5) 0%, rgba(168,85,247,0) 70%)',
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.2 }}
    />
  );
};

const FloatingDots = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="floating-dots-container">
        {[...Array(30)].map((_, i) => (
          <div key={i} className={`floating-dot dot-${i}`} />
        ))}
      </div>
      <style jsx>{`
        .floating-dot {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 9999px;
          background-color: rgba(168, 85, 247, 0.6);
          box-shadow: 
            0 0 20px 4px rgba(168, 85, 247, 0.5),
            0 0 35px 6px rgba(168, 85, 247, 0.4),
            0 0 50px 8px rgba(168, 85, 247, 0.3),
            0 0 65px 10px rgba(168, 85, 247, 0.2);
          filter: blur(0.5px);
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          opacity: 0;
          animation: glow 4s infinite;
          mix-blend-mode: screen;
        }

        @keyframes glow {
          0% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.3); }
          100% { opacity: 0.3; transform: scale(1); }
        }
        
        @keyframes float1 {
          0% { transform: translate(0, 0); }
          50% { transform: translate(15px, 15px); }
          100% { transform: translate(0, 0); }
        }
        
        @keyframes float2 {
          0% { transform: translate(0, 0); }
          50% { transform: translate(-15px, 15px); }
          100% { transform: translate(0, 0); }
        }
        
        .dot-0 { left: 10%; top: 10%; animation: float1 6s ease-in-out infinite, glow 4s infinite; }
        .dot-1 { left: 20%; top: 20%; animation: float2 6s ease-in-out infinite, glow 4s infinite; }
        .dot-2 { left: 30%; top: 30%; animation: float1 6s ease-in-out infinite, glow 4s infinite; }
        .dot-3 { left: 40%; top: 40%; animation: float2 6s ease-in-out infinite, glow 4s infinite; }
        .dot-4 { left: 50%; top: 50%; animation: float1 6s ease-in-out infinite, glow 4s infinite; }
        .dot-5 { left: 60%; top: 60%; animation: float2 6s ease-in-out infinite, glow 4s infinite; }
        .dot-6 { left: 70%; top: 70%; animation: float1 6s ease-in-out infinite, glow 4s infinite; }
        .dot-7 { left: 80%; top: 80%; animation: float2 6s ease-in-out infinite, glow 4s infinite; }
        .dot-8 { left: 90%; top: 90%; animation: float1 6s ease-in-out infinite, glow 4s infinite; }
        .dot-9 { left: 15%; top: 85%; animation: float2 6s ease-in-out infinite, glow 4s infinite; }
        .dot-10 { left: 25%; top: 75%; animation: float1 6s ease-in-out infinite, glow 4s infinite; }
        .dot-11 { left: 35%; top: 65%; animation: float2 6s ease-in-out infinite, glow 4s infinite; }
        .dot-12 { left: 45%; top: 55%; animation: float1 6s ease-in-out infinite, glow 4s infinite; }
        .dot-13 { left: 55%; top: 45%; animation: float2 6s ease-in-out infinite, glow 4s infinite; }
        .dot-14 { left: 65%; top: 35%; animation: float1 6s ease-in-out infinite, glow 4s infinite; }
        .dot-15 { left: 75%; top: 25%; animation: float2 6s ease-in-out infinite, glow 4s infinite; }
        .dot-16 { left: 85%; top: 15%; animation: float1 6s ease-in-out infinite, glow 4s infinite; }
        .dot-17 { left: 95%; top: 5%; animation: float2 6s ease-in-out infinite, glow 4s infinite; }
        .dot-18 { left: 5%; top: 95%; animation: float1 6s ease-in-out infinite, glow 4s infinite; }
        .dot-19 { left: 15%; top: 45%; animation: float2 6s ease-in-out infinite, glow 4s infinite; }
        .dot-20 { left: 25%; top: 35%; animation: float1 6s ease-in-out infinite, glow 4s infinite; }
        .dot-21 { left: 35%; top: 25%; animation: float2 6s ease-in-out infinite, glow 4s infinite; }
        .dot-22 { left: 45%; top: 15%; animation: float1 6s ease-in-out infinite, glow 4s infinite; }
        .dot-23 { left: 55%; top: 85%; animation: float2 6s ease-in-out infinite, glow 4s infinite; }
        .dot-24 { left: 65%; top: 75%; animation: float1 6s ease-in-out infinite, glow 4s infinite; }
        .dot-25 { left: 75%; top: 65%; animation: float2 6s ease-in-out infinite, glow 4s infinite; }
        .dot-26 { left: 85%; top: 55%; animation: float1 6s ease-in-out infinite, glow 4s infinite; }
        .dot-27 { left: 95%; top: 45%; animation: float2 6s ease-in-out infinite, glow 4s infinite; }
        .dot-28 { left: 5%; top: 35%; animation: float1 6s ease-in-out infinite, glow 4s infinite; }
        .dot-29 { left: 15%; top: 25%; animation: float2 6s ease-in-out infinite, glow 4s infinite; }
      `}</style>
    </div>
  );
};

export { MouseFollower, FloatingDots };
