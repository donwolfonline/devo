'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  User, 
  Calendar, 
  Clock, 
  Share2, 
  ArrowLeft 
} from 'lucide-react';
import Link from 'next/link';

// Mock blog posts data (same as in the main blog page)
const blogPosts = [
  {
    id: '1',
    title: "Mastering Next.js 15: A Comprehensive Guide",
    description: "Deep dive into the latest features and best practices for Next.js 15, including server components, routing, and performance optimization.",
    content: `
      ## Introduction to Next.js 15

      Next.js 15 brings a revolutionary approach to web development with its enhanced server components and routing capabilities. In this comprehensive guide, we'll explore the key features that make Next.js 15 a game-changer for modern web applications.

      ### Key Features

      1. **Server Components**: Improved performance and rendering strategies
      2. **Enhanced Routing**: More intuitive and flexible routing system
      3. **Optimized Performance**: Significant improvements in build and runtime efficiency

      ### Getting Started

      To begin with Next.js 15, you'll need to:
      
      - Install the latest version of Next.js
      - Configure your project for server components
      - Understand the new routing paradigm
    `,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
    author: "Sarah Chen",
    date: "June 15, 2024",
    readTime: "12 min",
    category: "Web Development",
    tags: ["Next.js", "React", "Performance"],
  },
  // Add other blog posts here with the same structure
];

export default function BlogPostPage({ params }: { params: { id: string } }) {
  // Find the blog post
  const post = blogPosts.find(p => p.id === params.id);

  // If post not found, show 404
  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back Button */}
        <Link 
          href="/blog" 
          className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Blog
        </Link>

        {/* Post Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {post.title}
          </h1>

          {/* Metadata */}
          <div className="flex items-center gap-4 text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12 rounded-xl overflow-hidden shadow-lg"
        >
          <Image
            src={post.image}
            alt={post.title}
            width={1200}
            height={600}
            className="w-full h-auto object-cover"
          />
        </motion.div>

        {/* Post Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="prose dark:prose-invert max-w-none"
        >
          <div dangerouslySetInnerHTML={{ __html: convertMarkdownToHTML(post.content) }} />
        </motion.div>

        {/* Share Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 border-t pt-8 flex justify-between items-center"
        >
          <p className="text-muted-foreground">
            Enjoyed this article? Share it with others.
          </p>
          <div className="flex items-center gap-4">
            <button 
              type="button" 
              aria-label="Share article" 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Share2 className="w-6 h-6" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Simple markdown to HTML converter (you might want to use a more robust library)
function convertMarkdownToHTML(markdown: string): string {
  return markdown
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-semibold mt-6 mb-4">$1</h2>')
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold mt-4 mb-3">$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/^- (.*$)/gim, '<li class="list-disc ml-6">$1</li>')
    .replace(/\n\n/g, '</p><p>');
}
