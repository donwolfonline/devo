'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Search, 
  Filter, 
  Clock, 
  BookOpen, 
  Tag, 
  User, 
  Calendar, 
  Coffee,
  Zap,
  BookmarkPlus
} from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: "Mastering Next.js 15: A Comprehensive Guide",
    description: "Deep dive into the latest features and best practices for Next.js 15, including server components, routing, and performance optimization.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
    author: "Sarah Chen",
    date: "June 15, 2024",
    readTime: "12 min",
    category: "Web Development",
    tags: ["Next.js", "React", "Performance"],
    featured: true,
  },
  {
    id: 2,
    title: "Design Systems: Building Scalable UI Components",
    description: "Learn how to create a robust design system that ensures consistency and speeds up your development workflow.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
    author: "Michael Rodriguez",
    date: "May 28, 2024",
    readTime: "9 min",
    category: "Design",
    tags: ["UI/UX", "Design Systems", "Components"],
  },
  {
    id: 3,
    title: "AI-Powered Development: The Future of Coding",
    description: "Exploring how AI tools are revolutionizing software development, from code generation to intelligent debugging.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop",
    author: "Alex Johnson",
    date: "June 5, 2024",
    readTime: "15 min",
    category: "AI & Technology",
    tags: ["AI", "Machine Learning", "Coding"],
    featured: true,
  },
  {
    id: 4,
    title: "Tailwind CSS: Advanced Styling Techniques",
    description: "Go beyond the basics with advanced Tailwind CSS techniques to create truly responsive and dynamic designs.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
    author: "Emma Wilson",
    date: "May 20, 2024",
    readTime: "10 min",
    category: "Web Design",
    tags: ["CSS", "Tailwind", "Styling"],
  },
  {
    id: 5,
    title: "State Management in Modern React Applications",
    description: "Comprehensive guide to choosing and implementing state management solutions in complex React projects.",
    image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?q=80&w=2070&auto=format&fit=crop",
    author: "David Park",
    date: "June 10, 2024",
    readTime: "14 min",
    category: "Web Development",
    tags: ["React", "State Management", "Performance"],
  },
  {
    id: 6,
    title: "Serverless Architecture: Scaling with Ease",
    description: "Understand the power of serverless computing and how it can transform your application's scalability and cost-efficiency.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop",
    author: "Lisa Chen",
    date: "May 25, 2024",
    readTime: "11 min",
    category: "Cloud Computing",
    tags: ["Serverless", "Cloud", "Scalability"],
  }
];

const BlogPostCard = ({ post, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-card rounded-xl overflow-hidden border border-border"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Featured Badge */}
        {post.featured && (
          <div className="absolute top-4 left-4 px-2 py-1 bg-amber-500/90 text-white text-xs rounded-full flex items-center gap-1">
            <Zap className="w-3 h-3" />
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Post Metadata */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{post.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{post.date}</span>
          </div>
        </div>

        {/* Title and Description */}
        <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
          {post.title}
        </h3>
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {post.description}
        </p>

        {/* Tags and Read Time */}
        <div className="flex justify-between items-center">
          <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{post.readTime}</span>
          </div>
        </div>

        {/* Read More & Bookmark */}
        <div className="mt-4 flex justify-between items-center">
          <Link 
            href={`/blog/${post.id}`} 
            className="px-4 py-2 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            Read More
          </Link>
          <button className="text-muted-foreground hover:text-primary transition-colors">
            <BookmarkPlus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Derive unique categories and tags
  const categories = ["All", ...new Set(blogPosts.map(post => post.category))];
  const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));

  // Filtering logic
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTags = 
      selectedTags.length === 0 || 
      selectedTags.every(tag => post.tags.includes(tag));
    
    return matchesCategory && matchesSearch && matchesTags;
  });

  // Tag toggle function
  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-foreground sm:text-5xl mb-6">
            Developer Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Insights, tutorials, and thoughts on web development, design, and technology.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12 space-y-6"
        >
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search blog posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-card border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-accent/10 text-muted-foreground hover:bg-accent/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 justify-center">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-xs transition-all flex items-center gap-1 ${
                  selectedTags.includes(tag)
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'bg-accent/10 text-muted-foreground hover:bg-accent/20 border border-transparent'
                }`}
              >
                <Tag className="w-3 h-3" />
                {tag}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCategory}-${searchQuery}-${selectedTags.join()}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredPosts.map((post, index) => (
              <BlogPostCard key={post.id} post={post} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Coffee className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No blog posts found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
