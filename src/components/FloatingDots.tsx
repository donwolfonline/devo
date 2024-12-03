'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export const FloatingDots = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const dots: HTMLDivElement[] = [];
    const numDots = 50; // Number of floating dots

    // Create dots
    for (let i = 0; i < numDots; i++) {
      const dot = document.createElement('div');
      dot.className = 'absolute w-1 h-1 rounded-full bg-purple-500/20';
      container.appendChild(dot);
      dots.push(dot);
      dotsRef.current.push(dot);

      // Random initial position
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      dot.style.transform = `translate(${x}px, ${y}px)`;
    }

    // Animate dots
    const animate = () => {
      dots.forEach((dot) => {
        const currentTransform = dot.style.transform;
        const [x, y] = currentTransform
          .match(/translate\((.+)px,\s*(.+)px\)/)!
          .slice(1)
          .map(Number);

        // Random movement
        const newX = x + (Math.random() - 0.5) * 2;
        const newY = y + (Math.random() - 0.5) * 2;

        // Keep dots within bounds
        const boundedX = Math.max(0, Math.min(newX, window.innerWidth));
        const boundedY = Math.max(0, Math.min(newY, window.innerHeight));

        dot.style.transform = `translate(${boundedX}px, ${boundedY}px)`;
      });

      requestAnimationFrame(animate);
    };

    const animationFrame = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrame);
      dotsRef.current.forEach(dot => dot.remove());
      dotsRef.current = [];
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  );
};
