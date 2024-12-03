'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import AnimatedLogo from '@/components/shared/AnimatedLogo';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { href: "/explore", label: "Explore" },
  { href: "/link-in-bio", label: "Link in Bio" },
  { href: "/templates", label: "Templates" }
];

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide navbar in super admin pages
  if (pathname?.startsWith('/superadmin')) {
    return null;
  }

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
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-gray-300 hover:text-white transition-colors text-sm lg:text-base whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}

            {/* Desktop Authentication Buttons */}
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white focus:outline-none"
          >
            <span className="sr-only">Open main menu</span>
            {isMobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden"
          >
            <div 
              className="fixed inset-0 z-40 bg-black bg-opacity-75" 
              onClick={() => setIsMobileMenuOpen(false)} 
            />
            
            <div className="fixed inset-x-0 top-16 z-50 min-h-screen bg-[#0A0118] bg-opacity-95 backdrop-blur-sm">
              <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-8 space-y-6">
                <div className="flex flex-col items-center space-y-4 w-full max-w-xs">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full px-8 py-3 text-center text-white text-xl rounded-full border border-purple-600 hover:bg-purple-600/10 transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>

                <div className="flex flex-col items-center space-y-4 w-full max-w-xs pt-8">
                  {!session ? (
                    <>
                      <Link
                        href="/auth/sign-in"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="w-full px-8 py-3 text-center text-white text-xl rounded-full border border-purple-600 hover:bg-purple-600/10 transition-colors"
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/register"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="w-full px-8 py-3 text-center text-white text-xl rounded-full border border-purple-600 hover:bg-purple-600/10 transition-colors"
                      >
                        Sign Up
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        href={session?.user?.role === 'SUPER_ADMIN' ? '/superadmin/dashboard' : '/dashboard'}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="w-full px-8 py-3 text-center text-white text-xl rounded-full border border-purple-600 hover:bg-purple-600/10 transition-colors"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          signOut({ callbackUrl: '/' });
                        }}
                        className="w-full px-8 py-3 text-center text-white text-xl rounded-full border border-purple-600 hover:bg-purple-600/10 transition-colors"
                      >
                        Sign Out
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
