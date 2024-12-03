'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';
import { templates } from '@/lib/sampleData';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function TemplatesPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const navItems = [
    { href: "/explore", label: "Explore" },
    { href: "/link-in-bio", label: "Link in Bio" },
    { href: "/templates", label: "Templates" },
    { href: "/pricing", label: "Pricing" }
  ];

  const handleTemplateSelect = async (templateId: string) => {
    if (!session) {
      router.push('/auth/sign-in?callbackUrl=/templates/' + templateId);
      return;
    }
    router.push('/templates/' + templateId);
  };

  return (
    <main className="min-h-screen bg-black">
      <div className="relative">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#9333EA]/10 via-[#A855F7]/5 to-transparent pointer-events-none" />

        {/* Main Content */}
        <div className="relative">
          {/* Navigation */}
          <Navbar />

          {/* Templates Section */}
          <div className="container mx-auto px-6 py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
                Choose Your Template
              </h1>
              <p className="text-xl text-gray-300 mb-12">
                Select a template to showcase your work in style
              </p>

              {/* Templates Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {templates.map((template, index) => (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-black/50 border border-[#9333EA]/20 rounded-lg p-6 hover:border-[#9333EA]/40 transition-all duration-300"
                  >
                    <div className="aspect-w-16 aspect-h-9 mb-4">
                      <Image
                        src={template.image}
                        alt={template.name}
                        className="rounded-lg object-cover"
                        width={400}
                        height={225}
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{template.name}</h3>
                    <p className="text-gray-400 mb-4">{template.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-[#9333EA]"></span>
                      <button
                        onClick={() => handleTemplateSelect(template.id)}
                        className="px-6 py-2 bg-black border-2 border-[#9333EA] rounded-full text-white hover:bg-[#9333EA]/10 focus:outline-none focus:ring-2 focus:ring-[#9333EA] transition-colors duration-200"
                      >
                        Use Template
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
