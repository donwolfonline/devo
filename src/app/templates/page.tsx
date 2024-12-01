'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { templates } from '@/lib/sampleData';
import Image from 'next/image';

export default function TemplatesPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleTemplateSelect = async (templateId: string) => {
    if (!session) {
      router.push('/auth/sign-in?callbackUrl=/templates/' + templateId);
      return;
    }
    router.push('/templates/' + templateId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">Choose Your Template</h1>
        <p className="text-lg text-muted">
          Select a template to start building your portfolio
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-foreground/5 rounded-lg overflow-hidden border border-accent/10 hover:border-accent/20 transition-colors duration-200"
          >
            <div className="aspect-[16/9] relative bg-foreground/10">
              <Image
                src={template.image}
                alt={template.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-medium mb-2">{template.name}</h3>
              <p className="text-sm text-muted mb-4">{template.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {template.features.map((feature) => (
                  <span
                    key={feature}
                    className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent"
                  >
                    {feature}
                  </span>
                ))}
              </div>
              <button
                onClick={() => handleTemplateSelect(template.id)}
                className="w-full px-4 py-2 rounded-lg bg-accent hover:bg-accent/90 text-white text-sm font-medium transition-colors duration-200"
              >
                Use Template
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
