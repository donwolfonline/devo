'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { templates } from '@/lib/sampleData';
import Image from 'next/image';

export default function TemplatePage({ params }: { params: { username: string } }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [template, setTemplate] = useState(
    templates.find((t) => t.id === params.username)
  );

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/sign-in?callbackUrl=/templates/' + params.username);
    }
  }, [status, router, params.username]);

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Template Not Found</h1>
          <p className="text-muted mb-8">
            The template you're looking for doesn't exist.
          </p>
          <button
            onClick={() => router.push('/templates')}
            className="px-4 py-2 rounded-lg bg-accent hover:bg-accent/90 text-white text-sm font-medium transition-colors"
          >
            Back to Templates
          </button>
        </div>
      </div>
    );
  }

  const handleCreatePortfolio = async () => {
    try {
      // TODO: Create portfolio with selected template
      router.push('/dashboard');
    } catch (error) {
      console.error('Failed to create portfolio:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-12"
      >
        {/* Preview */}
        <div className="relative aspect-[16/9] bg-foreground/5 rounded-lg overflow-hidden border border-accent/10">
          <Image
            src={template.image}
            alt={template.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{template.name}</h1>
          <p className="text-lg text-muted mb-8">{template.description}</p>

          <div className="space-y-8">
            {/* Features */}
            <div>
              <h2 className="text-lg font-medium mb-4">Features</h2>
              <div className="flex flex-wrap gap-2">
                {template.features.map((feature) => (
                  <span
                    key={feature}
                    className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div>
              <h2 className="text-lg font-medium mb-4">Tech Stack</h2>
              <div className="flex flex-wrap gap-2">
                {template.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <button
                onClick={handleCreatePortfolio}
                className="w-full px-6 py-3 rounded-lg bg-accent hover:bg-accent/90 text-white font-medium transition-colors"
              >
                Create Portfolio with This Template
              </button>
              <button
                onClick={() => router.push('/templates')}
                className="w-full px-6 py-3 rounded-lg border border-accent text-accent hover:bg-accent/10 font-medium transition-colors"
              >
                Back to Templates
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
