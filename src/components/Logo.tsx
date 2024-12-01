'use client';

import { useTheme } from 'next-themes';
import Link from 'next/link';

export default function Logo() {
  const { theme } = useTheme();

  return (
    <Link href="/" className="flex items-center space-x-2">
      <div className="w-8 h-8 rounded bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
        <span className="font-mono text-lg font-bold text-white">&lt;/&gt;</span>
      </div>
      <span className="text-xl font-semibold tracking-tight text-foreground">
        Dev<span className="text-indigo-400">Showcase</span>
      </span>
    </Link>
  );
}
