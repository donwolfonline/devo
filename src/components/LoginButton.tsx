'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function LoginButton() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session && session.user) {
    return (
      <motion.div 
        className="flex items-center gap-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          onClick={() => signOut()}
          variant="ghost"
          className="text-gray-300 hover:text-white transition-all duration-300 text-sm font-medium"
        >
          Sign Out
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="flex items-center gap-4 sm:gap-6"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        whileHover={{ y: -2 }}
        whileTap={{ y: 0 }}
      >
        <Button
          onClick={() => signIn('github')}
          variant="ghost"
          className="text-gray-300 hover:text-white transition-all duration-300 text-sm font-medium px-4 py-2"
        >
          Sign In
        </Button>
      </motion.div>

      <motion.div
        whileHover={{ y: -2 }}
        whileTap={{ y: 0 }}
      >
        <Button
          onClick={() => router.push('/auth/sign-up')}
          variant="ghost"
          className="text-gray-300 hover:text-white transition-all duration-300 text-sm font-medium px-4 py-2"
        >
          Sign Up
        </Button>
      </motion.div>
    </motion.div>
  );
}
