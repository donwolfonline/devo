'use client';

import Link from 'next/link';
import AnimatedDevIcon from './AnimatedDevIcon';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <AnimatedDevIcon />
    </Link>
  );
}
