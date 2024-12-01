'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, 
  Palette, 
  Layout,
  Globe,
  Zap,
  Search,
  Star,
  ExternalLink,
  Eye,
  Heart,
  Share2
} from 'lucide-react';

const examples = [
  {
    id: 1,
    title: "Modern Portfolio",
    description: "A sleek, minimalist portfolio with dark mode and smooth animations",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop",
    category: "Design",
    tags: ["Dark Mode", "Animations", "Responsive"],
    author: "Sarah Chen",
    likes: 234,
    views: 1420,
    demoUrl: "https://example.com/modern-portfolio",
    featured: true,
  },
  {
    id: 2,
    title: "Developer Hub",
    description: "Showcase your projects with GitHub integration and live demos",
    image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?q=80&w=2070&auto=format&fit=crop",
    category: "Development",
    tags: ["GitHub", "Live Demo", "Projects"],
    author: "Alex Morgan",
    likes: 189,
    views: 980,
    demoUrl: "https://example.com/dev-hub",
    featured: true,
  },
  {
    id: 3,
    title: "Creative Showcase",
    description: "Perfect for designers and artists with gallery-style layout",
    image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=2074&auto=format&fit=crop",
    category: "Design",
    tags: ["Gallery", "Creative", "Interactive"],
    author: "Emma Wilson",
    likes: 156,
    views: 890,
    demoUrl: "https://example.com/creative",
  },
  {
    id: 4,
    title: "Tech Blog",
    description: "Share your knowledge with an integrated blog platform",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop",
    category: "Blog",
    tags: ["MDX", "RSS", "Comments"],
    author: "David Park",
    likes: 145,
    views: 760,
    demoUrl: "https://example.com/tech-blog",
  },
  {
    id: 5,
    title: "Minimal Resume",
    description: "Clean and professional resume-style portfolio",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
    category: "Professional",
    tags: ["Resume", "Clean", "Minimal"],
    author: "Michael Brown",
    likes: 167,
    views: 920,
    demoUrl: "https://example.com/minimal",
    featured: true,
  },
  {
    id: 6,
    title: "Interactive CV",
    description: "Engaging interactive resume with animations",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
    category: "Professional",
    tags: ["Interactive", "CV", "Animation"],
    author: "Lisa Johnson",
    likes: 198,
    views: 1150,
    demoUrl: "https://example.com/interactive-cv",
  },
];

const categories = ["All", ...new Set(examples.map(example => example.category))];
const allTags = Array.from(new Set(examples.flatMap(example => example.tags)));

const ExampleCard = ({ example, index }) => {
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
        <img
          src={example.image}
          alt={example.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Overlay Content */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-black/40"
            >
              <a
                href={example.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-full flex items-center gap-2 hover:bg-primary/90 transition-colors"
              >
                <Eye className="w-4 h-4" />
                View Demo
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Featured Badge */}
        {example.featured && (
          <div className="absolute top-4 left-4 px-2 py-1 bg-amber-500/90 text-white text-xs rounded-full flex items-center gap-1">
            <Star className="w-3 h-3" />
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-semibold text-foreground">{example.title}</h3>
          <div className="flex items-center gap-3 text-muted-foreground">
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              <span className="text-sm">{example.likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span className="text-sm">{example.views}</span>
            </div>
          </div>
        </div>
        
        <p className="text-muted-foreground mb-4">{example.description}</p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {example.tags.map(tag => (
            <span
              key={tag}
              className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Author */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary/60 flex items-center justify-center text-white font-semibold">
              {example.author[0]}
            </div>
            <span className="text-sm text-muted-foreground">{example.author}</span>
          </div>
          <button className="p-2 rounded-full hover:bg-accent/10 text-muted-foreground transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default function ExamplesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filteredExamples = examples.filter(example => {
    const matchesCategory = selectedCategory === "All" || example.category === selectedCategory;
    const matchesSearch = example.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         example.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.every(tag => example.tags.includes(tag));
    return matchesCategory && matchesSearch && matchesTags;
  });

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
            Portfolio Examples
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore beautiful portfolio examples and get inspired for your next project.
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
              placeholder="Search examples..."
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
                className={`px-3 py-1 rounded-full text-xs transition-all ${
                  selectedTags.includes(tag)
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'bg-accent/10 text-muted-foreground hover:bg-accent/20 border border-transparent'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Examples Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCategory}-${searchQuery}-${selectedTags.join()}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredExamples.map((example, index) => (
              <ExampleCard key={example.id} example={example} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredExamples.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No examples found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
