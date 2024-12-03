'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface LinkDesign {
  id: string;
  name: string;
  description: string;
  previewImage: string;
}

export function LinkDesignSelector() {
  const [designs, setDesigns] = useState<LinkDesign[]>([]);
  const [selectedDesign, setSelectedDesign] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLinkDesigns() {
      try {
        const response = await fetch('/api/link-designs');
        if (!response.ok) {
          throw new Error('Failed to fetch link designs');
        }
        const data = await response.json();
        setDesigns(data);
      } catch (error) {
        console.error('Error fetching link designs:', error);
      }
    }

    fetchLinkDesigns();
  }, []);

  const handleDesignSelect = async (designId: string) => {
    try {
      const response = await fetch('/api/users/link-design', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ designId }),
      });

      if (!response.ok) {
        throw new Error('Failed to update link design');
      }

      setSelectedDesign(designId);
    } catch (error) {
      console.error('Error selecting link design:', error);
    }
  };

  return (
    <div className="bg-card p-6 rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-foreground">
        Choose Your Link Design
      </h2>
      <p className="text-muted-foreground mb-6">
        Select a unique design for your links page
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {designs.map((design) => (
          <motion.div
            key={design.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`
              relative border-2 rounded-xl p-4 cursor-pointer transition-all
              ${selectedDesign === design.id 
                ? 'border-primary bg-primary/10' 
                : 'border-border hover:border-primary/50'}
            `}
            onClick={() => handleDesignSelect(design.id)}
          >
            {selectedDesign === design.id && (
              <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1">
                <Check className="w-5 h-5" />
              </div>
            )}
            
            <div className="relative w-full aspect-video mb-4 rounded-lg overflow-hidden">
              <Image 
                src={design.previewImage} 
                alt={design.name} 
                fill 
                className="object-cover"
              />
            </div>

            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {design.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {design.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
