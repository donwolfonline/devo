'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { href: "/explore", label: "Explore" },
  { href: "/link-in-bio", label: "Link in Bio" },
  { href: "/templates", label: "Templates" }
];

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button 
        onClick={toggleMenu} 
        className="md:hidden text-white z-50 relative p-2"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-[#0A0118] z-40 md:hidden overflow-y-auto"
          onClick={closeMenu}
        >
          <div 
            className="min-h-screen flex flex-col items-center justify-center space-y-8 p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Navigation Links */}
            {navItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href}
                className="text-3xl text-white hover:text-purple-400 transition-colors"
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}

            {/* Authentication Buttons */}
            <div className="flex flex-col items-center space-y-4 w-full max-w-xs px-4">
              {session ? (
                <>
                  <Link 
                    href={session?.user?.role === 'SUPER_ADMIN' ? '/superadmin/dashboard' : '/dashboard'}
                    onClick={closeMenu}
                    className="w-full max-w-xs px-8 py-3 rounded-full border border-purple-600 text-white text-center text-xl hover:bg-purple-600/10 transition-colors"
                  >
                    Dashboard
                  </Link>
                  <button 
                    onClick={() => {
                      signOut({ callbackUrl: '/' });
                      closeMenu();
                    }}
                    className="w-full max-w-xs px-8 py-3 rounded-full border border-purple-600 text-white text-center text-xl hover:bg-purple-600/10 transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => {
                    signIn();
                    closeMenu();
                  }}
                  className="w-full max-w-xs px-8 py-3 rounded-full border border-purple-600 text-white text-center text-xl hover:bg-purple-600/10 transition-colors"
                >
                  Get Started
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
