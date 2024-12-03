'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';
import { templates } from '@/lib/sampleData';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { MouseFollower, FloatingDots } from '@/components/BackgroundElements';
import { SpaceBackground } from '@/components/SpaceBackground';

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
    <div className="min-h-screen relative bg-gradient-to-b from-black via-purple-950/5 to-black">
      <SpaceBackground />
      <main className="flex min-h-screen flex-col relative overflow-hidden">
        <MouseFollower />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <FloatingDots />
        </div>

        {/* Background gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/20 via-black to-purple-950/20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-tl from-purple-900/10 via-transparent to-transparent pointer-events-none mix-blend-screen" />

        {/* Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-300 mb-4">
              Choose Your Template
            </h1>
            <p className="text-lg sm:text-xl text-gray-300/90 max-w-2xl mx-auto">
              Select from our collection of professionally designed templates to create your perfect portfolio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => handleTemplateSelect(template.id)}
                className="group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-white/10 transition-colors cursor-pointer border border-purple-500/10"
              >
                <div className="aspect-w-16 aspect-h-9 relative">
                  <Image
                    src={template.image}
                    alt={template.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white/90 mb-2">{template.name}</h3>
                  <p className="text-gray-300/80 mb-4">{template.description}</p>
                  
                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {template.features.map((feature, featureIndex) => (
                      <span
                        key={featureIndex}
                        className="px-3 py-1 text-sm bg-purple-500/10 text-purple-300/90 rounded-full border border-purple-500/20"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {template.techStack.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 text-sm bg-purple-900/20 text-purple-200/90 rounded-full border border-purple-400/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
