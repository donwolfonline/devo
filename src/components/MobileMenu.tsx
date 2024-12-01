'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

interface NavItem {
  name: string
  href: string
}

interface MobileMenuProps {
  navItems: NavItem[]
}

export default function MobileMenu({ navItems }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const menuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        duration: 0.2,
        ease: 'easeInOut'
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    }
  }

  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: 'easeOut'
      }
    })
  }

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-50 p-2 text-gray-300 hover:text-white focus:outline-none"
        aria-label="Toggle mobile menu"
      >
        <div className="space-y-2">
          <motion.span
            animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-current transition-transform"
          />
          <motion.span
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-6 h-0.5 bg-current"
          />
          <motion.span
            animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-current transition-transform"
          />
        </div>
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-40 bg-[#0A0F1C]/95 backdrop-blur-lg"
          >
            <div className="flex flex-col h-full px-6 pt-24 pb-8">
              <nav className="space-y-8">
                {/* Navigation Links */}
                <div className="space-y-6">
                  {navItems.map((item, i) => (
                    <motion.div
                      key={item.name}
                      custom={i}
                      variants={itemVariants}
                      className="block"
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="text-2xl font-medium text-gray-300 hover:text-indigo-400 transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Call to Action */}
                <motion.div
                  variants={itemVariants}
                  custom={navItems.length}
                  className="pt-6 mt-6 border-t border-gray-800"
                >
                  <Link
                    href="/get-started"
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-lg font-medium transition-colors duration-200 w-full justify-center"
                  >
                    Get Started
                  </Link>
                </motion.div>
              </nav>

              {/* Footer Links */}
              <motion.div
                variants={itemVariants}
                custom={navItems.length + 1}
                className="mt-auto space-y-6 text-sm text-gray-500"
              >
                <div className="flex space-x-4">
                  <Link href="/privacy" className="hover:text-gray-300">Privacy</Link>
                  <Link href="/terms" className="hover:text-gray-300">Terms</Link>
                </div>
                <p> 2023 DevShowcase</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
