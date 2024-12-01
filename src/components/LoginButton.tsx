'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard"
          className="text-sm font-medium text-muted hover:text-accent transition-colors"
        >
          Dashboard
        </Link>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => signOut()}
          className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors"
        >
          Sign Out
        </motion.button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => signIn()}
        className="px-4 py-2 rounded-lg bg-accent hover:bg-accent/90 text-white text-sm font-medium transition-colors"
      >
        Sign In
      </motion.button>
      <Link
        href="/auth/sign-up"
        className="px-4 py-2 rounded-lg border border-accent text-accent hover:bg-accent/10 text-sm font-medium transition-colors"
      >
        Sign Up
      </Link>
    </div>
  );
}
