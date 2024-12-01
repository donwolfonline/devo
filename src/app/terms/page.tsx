'use client';

import { motion } from 'framer-motion';
import { Shield, FileText, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <Shield className="w-16 h-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-foreground sm:text-5xl mb-6">
            Terms of Service
          </h1>
          <p className="text-xl text-muted-foreground">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose dark:prose-invert max-w-none"
        >
          <section className="mb-12">
            <h2 className="flex items-center gap-2 text-2xl font-semibold mb-4">
              <FileText className="w-6 h-6 text-primary" />
              1. Introduction
            </h2>
            <p>
              Welcome to DevShowcase ("we," "our," or "us"). By accessing and using our website and services,
              you agree to comply with and be bound by these Terms of Service. Please read them carefully
              before using our platform.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">2. Use of Services</h2>
            <p>
              Our services are designed to help developers showcase their work and connect with opportunities.
              You agree to use these services only for lawful purposes and in accordance with these Terms.
            </p>
            <h3 className="text-xl font-semibold mt-6 mb-3">2.1 Account Creation</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>You must provide accurate and complete information when creating an account</li>
              <li>You are responsible for maintaining the security of your account credentials</li>
              <li>You must notify us immediately of any unauthorized access to your account</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">3. Content Guidelines</h2>
            <p>
              When using our platform, you agree not to post or share:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Content that infringes on intellectual property rights</li>
              <li>Malicious code or harmful software</li>
              <li>False or misleading information</li>
              <li>Content that violates any applicable laws or regulations</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property</h2>
            <p>
              You retain all rights to your content, but grant us a license to display and promote it on our platform.
              Our platform and its original content remain the exclusive property of DevShowcase.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">5. Privacy</h2>
            <p>
              Your privacy is important to us. Please review our{' '}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>{' '}
              to understand how we collect, use, and protect your personal information.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">6. Termination</h2>
            <p>
              We reserve the right to terminate or suspend access to our services for violations of these Terms
              or for any other reason at our sole discretion.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, we shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages resulting from your use of our services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">8. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will notify users of any material
              changes via email or through our platform.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="flex items-center gap-2 text-2xl font-semibold mb-4">
              <AlertCircle className="w-6 h-6 text-primary" />
              9. Contact Us
            </h2>
            <p>
              If you have any questions about these Terms, please contact us at{' '}
              <a href="mailto:legal@devshowcase.com" className="text-primary hover:underline">
                legal@devshowcase.com
              </a>
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
