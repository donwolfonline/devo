import './globals.css'
import type { Metadata } from 'next'
import { Inter, Fira_Code } from 'next/font/google'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import ThemeToggle from '@/components/ThemeToggle'
import Logo from '@/components/Logo'
import Link from 'next/link'
import MobileMenu from '@/components/MobileMenu'
import Providers from '@/components/Providers'
import LoginButton from '@/components/LoginButton'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const firaCode = Fira_Code({ subsets: ['latin'], variable: '--font-fira-code' })

const navItems = [
  { name: 'Templates', href: '/templates' },
  { name: 'Features', href: '/features' },
  { name: 'Docs', href: '/docs' },
]

export const metadata: Metadata = {
  title: 'DevShowcase - Portfolio Builder',
  description: 'Create and manage your developer portfolio with ease',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers session={session}>
          {/* Code-like accent lines */}
          <div className="fixed inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,transparent_49%,rgba(99,102,241,0.05)_49%,rgba(99,102,241,0.05)_51%,transparent_51%,transparent_100%)] bg-[length:100px_100%]"></div>
            <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,transparent_97%,rgba(99,102,241,0.1)_97%,rgba(99,102,241,0.1)_100%)] bg-[length:100%_8px]"></div>
          </div>

          {/* Global Navigation */}
          <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-accent/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center space-x-8">
                  <Logo />
                  <div className="hidden md:flex items-center space-x-6">
                    {navItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-sm text-muted hover:text-accent transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-4 z-10">
                  <LoginButton />
                  <ThemeToggle />
                  <div className="md:hidden">
                    <MobileMenu items={navItems} />
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="pt-16 min-h-screen relative">
            {/* Glowing orbs in the background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
            </div>
            
            {/* Content */}
            <div className="relative">
              {children}
            </div>
          </main>

          {/* Footer */}
          <footer className="relative mt-20 border-t border-accent/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="text-sm font-medium text-muted font-mono">Product</h3>
                  <ul className="mt-4 space-y-2">
                    <li><Link href="/templates" className="text-sm text-muted hover:text-foreground">Templates</Link></li>
                    <li><Link href="/showcase" className="text-sm text-muted hover:text-foreground">Showcase</Link></li>
                    <li><Link href="/features" className="text-sm text-muted hover:text-foreground">Features</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted font-mono">Resources</h3>
                  <ul className="mt-4 space-y-2">
                    <li><Link href="/docs" className="text-sm text-muted hover:text-foreground">Documentation</Link></li>
                    <li><Link href="/guides" className="text-sm text-muted hover:text-foreground">Guides</Link></li>
                    <li><Link href="/examples" className="text-sm text-muted hover:text-foreground">Examples</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted font-mono">Company</h3>
                  <ul className="mt-4 space-y-2">
                    <li><Link href="/about" className="text-sm text-muted hover:text-foreground">About</Link></li>
                    <li><Link href="/blog" className="text-sm text-muted hover:text-foreground">Blog</Link></li>
                    <li><Link href="/contact" className="text-sm text-muted hover:text-foreground">Contact</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted font-mono">Legal</h3>
                  <ul className="mt-4 space-y-2">
                    <li><Link href="/privacy" className="text-sm text-muted hover:text-foreground">Privacy</Link></li>
                    <li><Link href="/terms" className="text-sm text-muted hover:text-foreground">Terms</Link></li>
                  </ul>
                </div>
              </div>
              <div className="mt-12 pt-8 border-t border-accent/10">
                <p className="text-sm text-muted text-center"> 2023 DevShowcase. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  )
}
