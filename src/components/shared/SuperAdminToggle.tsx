'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function SuperAdminToggle() {
  const [clicks, setClicks] = useState(0);
  const router = useRouter();

  const handleClick = useCallback(() => {
    const newCount = clicks + 1;
    if (newCount >= 5) {
      // Use window.location for a hard redirect to avoid Next.js routing issues
      window.location.href = '/superadmin';
      return;
    }
    setClicks(newCount);
  }, [clicks]);

  return (
    <motion.div
      className="absolute right-6 bottom-8 w-3 h-3 rounded-full bg-purple-500/50 cursor-pointer
                 hover:bg-purple-400/70 transition-colors duration-300
                 shadow-[0_0_10px_rgba(168,85,247,0.5)] hover:shadow-[0_0_15px_rgba(168,85,247,0.7)]"
      whileHover={{ scale: 1.3 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      title="Super Admin Access"
    />
  );
}
