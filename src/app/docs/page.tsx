'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Book, Code, Command, FileText, Settings, User } from 'lucide-react';

const sidebar = [
  {
    title: 'Getting Started',
    icon: Book,
    items: [
      { title: 'Introduction', id: 'introduction' },
      { title: 'Quick Start', id: 'quick-start' },
      { title: 'Installation', id: 'installation' },
    ],
  },
  {
    title: 'Features',
    icon: Command,
    items: [
      { title: 'Portfolio Creation', id: 'portfolio-creation' },
      { title: 'Templates', id: 'templates' },
      { title: 'Customization', id: 'customization' },
    ],
  },
  {
    title: 'Guides',
    icon: FileText,
    items: [
      { title: 'Custom Domain', id: 'custom-domain' },
      { title: 'SEO Optimization', id: 'seo' },
      { title: 'Analytics', id: 'analytics' },
    ],
  },
  {
    title: 'API Reference',
    icon: Code,
    items: [
      { title: 'Authentication', id: 'api-auth' },
      { title: 'Endpoints', id: 'api-endpoints' },
      { title: 'Rate Limits', id: 'api-limits' },
    ],
  },
];

const content = {
  introduction: {
    title: 'Introduction',
    content: `
DevShowcase is a powerful platform designed specifically for developers to create and manage their professional portfolios. With our platform, you can easily showcase your projects, skills, and experience in a way that stands out to potential employers and clients.

### Why DevShowcase?

- **Modern & Professional**: Choose from a variety of modern templates designed specifically for developers
- **Easy to Use**: Get started in minutes with our intuitive interface
- **Customizable**: Personalize every aspect of your portfolio to match your style
- **Developer-Focused**: Built by developers, for developers
    `,
  },
  'quick-start': {
    title: 'Quick Start',
    content: `
### Getting Started in 3 Simple Steps

1. **Create an Account**
   - Sign up using your email or GitHub account
   - Verify your email address

2. **Choose a Template**
   - Browse our collection of developer-focused templates
   - Select one that matches your style
   - Preview how your content will look

3. **Add Your Content**
   - Import projects from GitHub
   - Add your skills and experience
   - Customize the design to match your preferences

### Next Steps

After setting up your basic portfolio, consider:
- Connecting a custom domain
- Optimizing for SEO
- Setting up analytics
    `,
  },
  installation: {
    title: 'Installation',
    content: `
### System Requirements

- Node.js 14.0 or later
- npm or yarn package manager
- Git (optional, for version control)

### Local Development

\`\`\`bash
# Clone the repository
git clone https://github.com/yourusername/portfolio

# Install dependencies
npm install

# Start development server
npm run dev
\`\`\`

### Environment Setup

Create a \`.env.local\` file in your project root:

\`\`\`env
NEXT_PUBLIC_API_URL=your_api_url
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
\`\`\`
    `,
  },
  'portfolio-creation': {
    title: 'Portfolio Creation',
    content: `
### Creating Your Portfolio

1. **Select a Template**
   - Browse available templates
   - Preview with sample content
   - Choose based on your needs

2. **Customize Content**
   - Add personal information
   - Upload profile picture
   - Add projects and skills

3. **Organize Projects**
   - Add project details
   - Include screenshots
   - Link to live demos

4. **Add Custom Sections**
   - Create custom sections
   - Arrange content
   - Add media elements
    `,
  },
  templates: {
    title: 'Templates',
    content: `
### Available Templates

1. **Minimalist**
   - Clean and simple design
   - Perfect for focusing on content
   - Highly customizable

2. **Professional**
   - Business-focused layout
   - Detailed project showcases
   - Contact form included

3. **Creative**
   - Bold design elements
   - Interactive features
   - Unique layouts

### Customizing Templates

- Modify colors and fonts
- Adjust layout and spacing
- Add custom CSS
    `,
  },
  customization: {
    title: 'Customization',
    content: `
### Design Customization

- **Colors**: Customize your color scheme
- **Typography**: Choose from various fonts
- **Layout**: Adjust section arrangements
- **Components**: Modify individual elements

### Code Customization

\`\`\`css
/* Example custom CSS */
.portfolio-header {
  background: linear-gradient(to right, #3b82f6, #8b5cf6);
  padding: 2rem;
}

.project-card {
  border-radius: 0.5rem;
  transition: transform 0.2s;
}

.project-card:hover {
  transform: translateY(-4px);
}
\`\`\`
    `,
  },
};

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('introduction');

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-64 flex-shrink-0 border-r border-border"
          >
            <div className="p-6 sticky top-0">
              <nav className="space-y-8">
                {sidebar.map((section) => (
                  <div key={section.title}>
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
                      <section.icon className="w-4 h-4" />
                      {section.title}
                    </div>
                    <ul className="space-y-2">
                      {section.items.map((item) => (
                        <li key={item.id}>
                          <button
                            onClick={() => setActiveSection(item.id)}
                            className={`w-full text-left px-2 py-1 text-sm rounded-md transition-colors ${
                              activeSection === item.id
                                ? 'bg-primary/10 text-primary'
                                : 'text-foreground hover:bg-accent/10'
                            }`}
                          >
                            {item.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 p-8 lg:p-12"
          >
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <h1 className="text-3xl font-bold text-foreground mb-6">
                {content[activeSection]?.title}
              </h1>
              <div className="markdown-content">
                {content[activeSection]?.content.split('\n').map((line, index) => {
                  if (line.startsWith('###')) {
                    return (
                      <h3 key={index} className="text-xl font-semibold mt-8 mb-4">
                        {line.replace('### ', '')}
                      </h3>
                    );
                  }
                  if (line.startsWith('- ')) {
                    return (
                      <li key={index} className="ml-4 text-muted-foreground">
                        {line.replace('- ', '')}
                      </li>
                    );
                  }
                  if (line.startsWith('\`\`\`')) {
                    const language = line.replace('\`\`\`', '');
                    return (
                      <pre key={index} className="bg-accent/10 p-4 rounded-lg my-4">
                        <code className={`language-${language}`}>
                          {/* Code content would go here */}
                        </code>
                      </pre>
                    );
                  }
                  if (line.trim() === '') {
                    return <br key={index} />;
                  }
                  return <p key={index} className="text-muted-foreground">{line}</p>;
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
