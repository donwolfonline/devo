'use client';

import { motion } from 'framer-motion';
import { 
  Lock,
  FileText,
  Database,
  Shield,
  Cookie,
  Mail,
  Globe,
  AlertCircle
} from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <Lock className="w-16 h-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-foreground sm:text-5xl mb-6">
            Privacy Policy
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
              At DevShowcase, we take your privacy seriously. This Privacy Policy explains how we collect,
              use, disclose, and safeguard your information when you use our website and services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="flex items-center gap-2 text-2xl font-semibold mb-4">
              <Database className="w-6 h-6 text-primary" />
              2. Information We Collect
            </h2>
            <h3 className="text-xl font-semibold mt-6 mb-3">2.1 Personal Information</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Name and contact information</li>
              <li>Email address</li>
              <li>Professional information</li>
              <li>Portfolio content and projects</li>
              <li>Account credentials</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">2.2 Usage Information</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>IP address</li>
              <li>Pages visited and features used</li>
              <li>Time and date of visits</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="flex items-center gap-2 text-2xl font-semibold mb-4">
              <Shield className="w-6 h-6 text-primary" />
              3. How We Use Your Information
            </h2>
            <p>We use the collected information for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Providing and maintaining our services</li>
              <li>Personalizing your experience</li>
              <li>Improving our platform</li>
              <li>Communicating with you</li>
              <li>Analyzing usage patterns</li>
              <li>Preventing fraud and abuse</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="flex items-center gap-2 text-2xl font-semibold mb-4">
              <Cookie className="w-6 h-6 text-primary" />
              4. Cookies and Tracking
            </h2>
            <p>
              We use cookies and similar tracking technologies to enhance your experience on our platform.
              You can control cookie preferences through your browser settings.
            </p>
            <h3 className="text-xl font-semibold mt-6 mb-3">Types of Cookies We Use:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Essential cookies for basic functionality</li>
              <li>Analytics cookies to understand usage</li>
              <li>Preference cookies to remember your settings</li>
              <li>Marketing cookies for targeted advertising</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="flex items-center gap-2 text-2xl font-semibold mb-4">
              <Globe className="w-6 h-6 text-primary" />
              5. Data Sharing and Disclosure
            </h2>
            <p>We may share your information with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Service providers and partners</li>
              <li>Legal authorities when required by law</li>
              <li>Other users (only information you choose to make public)</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="flex items-center gap-2 text-2xl font-semibold mb-4">
              <Shield className="w-6 h-6 text-primary" />
              6. Data Security
            </h2>
            <p>
              We implement appropriate security measures to protect your information, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security assessments</li>
              <li>Access controls and authentication</li>
              <li>Secure data storage practices</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to data processing</li>
              <li>Export your data</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">8. Children's Privacy</h2>
            <p>
              Our services are not intended for children under 13. We do not knowingly collect or maintain
              information from persons under 13 years of age.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">9. Changes to Privacy Policy</h2>
            <p>
              We may update this Privacy Policy periodically. We will notify you of any material changes
              via email or through our platform.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="flex items-center gap-2 text-2xl font-semibold mb-4">
              <Mail className="w-6 h-6 text-primary" />
              10. Contact Us
            </h2>
            <p>
              For privacy-related questions or concerns, please contact us at{' '}
              <a href="mailto:privacy@devshowcase.com" className="text-primary hover:underline">
                privacy@devshowcase.com
              </a>
            </p>
          </section>

          <section className="mt-16 p-6 bg-primary/5 rounded-xl border border-primary/10">
            <h2 className="flex items-center gap-2 text-2xl font-semibold mb-4">
              <AlertCircle className="w-6 h-6 text-primary" />
              Important Notice
            </h2>
            <p className="text-muted-foreground">
              By using our services, you acknowledge that you have read and understood this Privacy Policy
              and agree to its terms. If you do not agree with this policy, please do not use our services.
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
