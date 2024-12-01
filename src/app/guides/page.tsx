'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, 
  Search, 
  BarChart, 
  Code2, 
  Palette, 
  Github,
  Share2,
  Zap,
  FileCode,
  Layout,
  Clock,
  BookOpen,
  Filter
} from 'lucide-react';

const guides = [
  {
    title: 'Getting Started',
    description: 'Learn how to create and customize your developer portfolio',
    icon: FileCode,
    category: 'Basics',
    difficulty: 'Beginner',
    timeToRead: '5 min',
    href: '/guides/getting-started',
    popular: true,
  },
  {
    title: 'Custom Domain Setup',
    description: 'Connect your portfolio to a custom domain name',
    icon: Globe,
    category: 'Configuration',
    difficulty: 'Intermediate',
    timeToRead: '10 min',
    href: '/guides/custom-domain',
    popular: true,
  },
  {
    title: 'SEO Optimization',
    description: 'Optimize your portfolio for search engines',
    icon: Search,
    category: 'Optimization',
    difficulty: 'Intermediate',
    timeToRead: '15 min',
    href: '/guides/seo',
    popular: true,
  },
  {
    title: 'Analytics Integration',
    description: 'Track visitors and engagement on your portfolio',
    icon: BarChart,
    category: 'Analytics',
    difficulty: 'Intermediate',
    timeToRead: '12 min',
    href: '/guides/analytics',
  },
  {
    title: 'Code Snippets',
    description: 'Showcase your code with syntax highlighting',
    icon: Code2,
    category: 'Content',
    difficulty: 'Beginner',
    timeToRead: '8 min',
    href: '/guides/code-snippets',
  },
  {
    title: 'Theme Customization',
    description: 'Customize your portfolio appearance',
    icon: Palette,
    category: 'Design',
    difficulty: 'Intermediate',
    timeToRead: '20 min',
    href: '/guides/theme-customization',
    popular: true,
  },
  {
    title: 'GitHub Integration',
    description: 'Connect and showcase your GitHub projects',
    icon: Github,
    category: 'Integration',
    difficulty: 'Intermediate',
    timeToRead: '15 min',
    href: '/guides/github-integration',
  },
  {
    title: 'Social Media Integration',
    description: 'Link your social media profiles',
    icon: Share2,
    category: 'Integration',
    difficulty: 'Beginner',
    timeToRead: '10 min',
    href: '/guides/social-media',
  },
  {
    title: 'Performance Optimization',
    description: 'Optimize your portfolio for speed',
    icon: Zap,
    category: 'Optimization',
    difficulty: 'Advanced',
    timeToRead: '25 min',
    href: '/guides/performance',
  },
  {
    title: 'Layout Customization',
    description: 'Customize your portfolio layout',
    icon: Layout,
    category: 'Design',
    difficulty: 'Advanced',
    timeToRead: '30 min',
    href: '/guides/layout-customization',
  },
];

const difficultyColors = {
  Beginner: 'text-green-500 bg-green-500/10 border-green-500/20',
  Intermediate: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
  Advanced: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
};

const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];
const categories = ['All', ...new Set(guides.map(guide => guide.category))];

const GuideCard = ({ guide, index }) => (
  <motion.a
    href={guide.href}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="group relative"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-200" />
    <div className="relative p-6 bg-card rounded-lg border border-border hover:border-primary/50 transition-all duration-300">
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
          <guide.icon className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-foreground">
              {guide.title}
            </h3>
            {guide.popular && (
              <span className="px-2 py-0.5 text-xs rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
                Popular
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-3 h-3" />
            {guide.timeToRead} read
          </div>
        </div>
      </div>
      <p className="text-muted-foreground mb-4 group-hover:text-foreground transition-colors">
        {guide.description}
      </p>
      <div className="flex items-center gap-2">
        <span className={`text-xs px-2 py-1 rounded-full border ${difficultyColors[guide.difficulty]}`}>
          {guide.difficulty}
        </span>
        <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
          {guide.category}
        </span>
      </div>
    </div>
  </motion.a>
);

export default function GuidesPage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGuides = guides.filter(guide => {
    const matchesDifficulty = selectedDifficulty === 'All' || guide.difficulty === selectedDifficulty;
    const matchesCategory = selectedCategory === 'All' || guide.category === selectedCategory;
    const matchesSearch = guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         guide.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDifficulty && matchesCategory && matchesSearch;
  });

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
            Developer Guides
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn how to make the most of your portfolio with our comprehensive guides.
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
              placeholder="Search guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-card border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Difficulty:</span>
              {difficulties.map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => setSelectedDifficulty(difficulty)}
                  className={`px-3 py-1 rounded-full text-sm transition-all ${
                    selectedDifficulty === difficulty
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-accent/10 text-muted-foreground hover:bg-accent/20'
                  }`}
                >
                  {difficulty}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Category:</span>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 rounded-full text-sm transition-all ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-accent/10 text-muted-foreground hover:bg-accent/20'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Guides Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedDifficulty}-${selectedCategory}-${searchQuery}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredGuides.map((guide, index) => (
              <GuideCard key={guide.title} guide={guide} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredGuides.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No guides found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
