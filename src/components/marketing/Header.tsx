'use client';

import Link from 'next/link';
import { useState } from 'react';
import { signIn, signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { 
  Menu, 
  X, 
  User 
} from 'lucide-react';
import AnimatedLogo from '@/components/shared/AnimatedLogo';

export default function MarketingHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/features', label: 'Features' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/blog', label: 'Blog' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-black/20 backdrop-blur-sm border-b border-purple-500/10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <AnimatedLogo header />
        </Link>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button 
            onClick={toggleMenu} 
            className="text-gray-400 hover:text-purple-500 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className={`
          ${isMenuOpen ? 'block' : 'hidden'} 
          md:block absolute md:static top-full left-0 w-full md:w-auto 
          bg-black/20 md:bg-transparent shadow-md md:shadow-none
          py-4 md:py-0 px-4 md:px-0
        `}>
          <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link 
                  href={link.href} 
                  className="text-gray-300 hover:text-purple-500 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Auth Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {session ? (
            <>
              <Link href={session.user.role === 'SUPER_ADMIN' ? '/superadmin/dashboard' : '/dashboard'}>
                <button 
                  className="px-4 py-2 rounded-lg bg-purple-500 text-white font-medium hover:bg-purple-600 transition-colors flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  Dashboard
                </button>
              </Link>
              <button 
                onClick={() => signOut()}
                className="px-4 py-2 rounded-lg border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => signIn()}
                className="px-4 py-2 rounded-lg bg-purple-500 text-white font-medium hover:bg-purple-600 transition-colors"
              >
                Sign In
              </button>
              <Link 
                href="/auth/sign-up"
                className="px-4 py-2 rounded-lg border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
