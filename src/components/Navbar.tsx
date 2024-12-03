'use client';

import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import MobileNavigation from './MobileNavigation';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import AnimatedLogo from '@/components/shared/AnimatedLogo';

const navItems = [
  { href: "/explore", label: "Explore" },
  { href: "/link-in-bio", label: "Link in Bio" },
  { href: "/templates", label: "Templates" }
];

export default function Navbar() {
  const pathname = usePathname();
  
  // Hide navbar in super admin dashboard
  if (pathname?.startsWith('/superadmin')) {
    return null;
  }

  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#0A0118]/95 backdrop-blur-sm' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <AnimatedLogo header />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-6">
            {navItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-gray-300 hover:text-white transition-colors text-sm lg:text-base whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Authentication Buttons */}
          <div className="flex items-center">
            <div className="hidden md:flex items-center space-x-3">
              {!session ? (
                <>
                  <Link 
                    href="/auth/sign-in"
                    className="px-4 lg:px-6 py-2 rounded-full border border-purple-600 text-white hover:bg-purple-600/10 transition-colors text-sm lg:text-base whitespace-nowrap"
                  >
                    Sign In
                  </Link>
                  <Link 
                    href="/register"
                    className="px-4 lg:px-6 py-2 rounded-full border border-purple-600 text-white hover:bg-purple-600/10 transition-colors text-sm lg:text-base whitespace-nowrap"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  <Link 
                    href={session?.user?.role === 'SUPER_ADMIN' ? '/superadmin/dashboard' : '/dashboard'}
                    className="px-4 lg:px-6 py-2 rounded-full border border-purple-600 text-white hover:bg-purple-600/10 transition-colors text-sm lg:text-base whitespace-nowrap"
                  >
                    Dashboard
                  </Link>
                  <button 
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="px-4 lg:px-6 py-2 rounded-full border border-purple-600 text-white hover:bg-purple-600/10 transition-colors text-sm lg:text-base whitespace-nowrap"
                  >
                    Sign Out
                  </button>
                </>
              )}
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden">
              <MobileNavigation />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
