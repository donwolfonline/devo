'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface TemplatePreviewProps {
  name: string;
  description: string;
  image: string;
  features: string[];
  previewUrl: string;
  selectUrl: string;
}

export default function TemplatePreview({
  name,
  description,
  image,
  features,
  previewUrl,
  selectUrl,
}: TemplatePreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
    >
      {/* Preview Image */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={image}
          alt={`${name} template preview`}
          fill
          className="object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-green-500 dark:from-blue-400 dark:to-green-400 text-transparent bg-clip-text">
          {name}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>

        {/* Features */}
        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
              <svg
                className="w-4 h-4 mr-2 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {feature}
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex gap-4">
          <Link
            href={previewUrl}
            className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg text-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Preview
          </Link>
          <Link
            href={selectUrl}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-center hover:bg-blue-700 transition-colors"
          >
            Select
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
