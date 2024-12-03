'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Book, Code, Command, FileText, Settings, User } from 'lucide-react';
import * as marked from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';

// Configure marked with highlight.js
marked.setOptions({
  highlight: function(code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  },
  langPrefix: 'hljs language-',
});

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
    title: 'Guides',
    icon: FileText,
    items: [
      { title: 'Profile Setup', id: 'profile-guide' },
      { title: 'Project Showcase', id: 'project-guide' },
      { title: 'Customization', id: 'customization-guide' },
    ],
  },
  {
    title: 'Advanced',
    icon: Code,
    items: [
      { title: 'Authentication', id: 'auth-advanced' },
      { title: 'API Integration', id: 'api-integration' },
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
    title: 'DevShowcase API Introduction',
    content: `
## Welcome to DevShowcase API

DevShowcase provides a comprehensive API for developers to programmatically manage their professional portfolios. Our RESTful API offers secure, flexible endpoints to create, read, update, and delete portfolio resources.

### Key Features
- Secure authentication
- Comprehensive resource management
- Developer-friendly design
- Robust error handling

### Authentication
All API requests require authentication via JWT token. Include the token in the \`Authorization\` header:

\`\`\`http
Authorization: Bearer YOUR_ACCESS_TOKEN
\`\`\`

### Base URL
\`https://api.devshowcase.com/v1\`

### Response Formats
- Successful responses use appropriate HTTP status codes
- Error responses include detailed error messages
- All responses are in JSON format
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
  'api-auth': {
    title: 'Authentication API',
    content: `
## Authentication Endpoints

### User Registration
\`POST /api/auth/register\`

#### Request Body
\`\`\`json
{
  "email": "developer@example.com",
  "password": "SecurePassword123!",
  "name": "Jane Doe",
  "username": "janedoe_dev"
}
\`\`\`

#### Validation Rules
- Email: Must be unique, valid email format
- Password: Minimum 8 characters, must include:
  * Uppercase letter
  * Lowercase letter
  * Number
  * Special character
- Username: 3-20 characters, alphanumeric and underscores

#### Possible Responses
- \`201 Created\`: Successful registration
- \`400 Bad Request\`: Validation errors
- \`409 Conflict\`: Email or username already exists

### User Login
\`POST /api/auth/login\`

#### Request Body
\`\`\`json
{
  "email": "developer@example.com",
  "password": "SecurePassword123!"
}
\`\`\`

#### Possible Responses
- \`200 OK\`: Successful login, returns access token
- \`401 Unauthorized\`: Invalid credentials
- \`429 Too Many Requests\`: Exceeded login attempts

### Password Reset
\`POST /api/auth/reset-password\`

#### Request Body
\`\`\`json
{
  "email": "developer@example.com"
}
\`\`\`

#### Possible Responses
- \`200 OK\`: Reset instructions sent
- \`404 Not Found\`: Email not registered
    `,
  },
  'api-endpoints': {
    title: 'Core API Endpoints',
    content: `
## Resource Management Endpoints

### Projects Endpoint
\`\`\`http
GET    /api/projects     - List all projects
POST   /api/projects     - Create a new project
GET    /api/projects/{id} - Get specific project
PUT    /api/projects/{id} - Update a project
DELETE /api/projects/{id} - Delete a project
\`\`\`

#### Project Creation Example
\`\`\`json
{
  "title": "Portfolio Website",
  "description": "Personal portfolio built with Next.js",
  "technologies": ["Next.js", "TypeScript", "Tailwind"],
  "githubUrl": "https://github.com/username/portfolio",
  "liveUrl": "https://myportfolio.com",
  "startDate": "2023-01-15",
  "endDate": null
}
\`\`\`

### Profile Endpoint
\`\`\`http
GET    /api/profile      - Retrieve user profile
PUT    /api/profile      - Update profile details
POST   /api/profile/social-links - Add social links
\`\`\`

### Skills Endpoint
\`\`\`http
GET    /api/skills       - List skills
POST   /api/skills       - Add a new skill
DELETE /api/skills/{id}  - Remove a skill
\`\`\`

### Experiences Endpoint
\`\`\`http
GET    /api/experiences  - List work experiences
POST   /api/experiences  - Add a new experience
PUT    /api/experiences/{id} - Update an experience
DELETE /api/experiences/{id} - Remove an experience
\`\`\`
    `,
  },
  'api-limits': {
    title: 'API Rate Limits & Best Practices',
    content: `
## Rate Limiting & Usage Guidelines

### Rate Limit Tiers
- \`Basic\`: 100 requests/hour
- \`Pro\`: 1000 requests/hour
- \`Enterprise\`: Custom limits

### Authentication Endpoints
- Login: 5 attempts per minute
- Registration: 10 attempts per hour
- Password Reset: 3 attempts per day

### Resource Endpoints
- \`GET\` requests: 100/minute
- \`POST\`, \`PUT\`, \`DELETE\`: 50/minute

### Handling Rate Limits
When limits are exceeded:
- Status Code: \`429 Too Many Requests\`
- Response includes \`Retry-After\` header

### Best Practices
1. Implement exponential backoff
2. Use webhooks for long-running tasks
3. Cache responses when possible
4. Monitor your API usage

### Error Handling Example
\`\`\`json
{
  "error": "Rate limit exceeded",
  "retryAfter": "60 seconds",
  "currentLimit": 100,
  "remainingRequests": 0
}
\`\`\`

### Recommended Client Libraries
- \`axios\` for JavaScript
- \`requests\` for Python
- \`guzzle\` for PHP
    `,
  },
  'profile-guide': {
    title: 'Profile Setup Guide',
    content: `
## Creating Your Developer Profile

Your DevShowcase profile is your digital professional identity. Follow these steps to create a compelling profile:

### 1. Personal Information
- Add a professional headshot
- Write a concise, impactful headline
- Craft a summary that highlights your unique value proposition

\`\`\`typescript
interface ProfileSetup {
  name: string;
  headline: string;
  summary: string;
  profilePicture: string;
}
\`\`\`

### 2. Contact & Social Links
- Include professional email
- Add LinkedIn profile
- Link GitHub, personal website, or portfolio
- Optional: Twitter, personal blog

### 3. Professional Details
- Current job title
- Location
- Professional interests
- Tech stack

### Best Practices
- Keep information up-to-date
- Use a professional tone
- Highlight achievements, not just responsibilities
- Show personality while maintaining professionalism
    `,
  },
  'project-guide': {
    title: 'Project Showcase Strategy',
    content: `
## Showcasing Your Projects Effectively

Projects are the heart of your developer portfolio. Here's how to make them stand out:

### 1. Project Selection
- Choose projects that demonstrate your skills
- Include a mix of:
  * Professional work
  * Personal projects
  * Open-source contributions

### 2. Project Details
Each project should include:
- Descriptive title
- Technologies used
- Your specific contributions
- Problem solved
- Challenges overcome

\`\`\`json
{
  "title": "DevShowcase Platform",
  "description": "Professional portfolio builder",
  "technologies": [
    "Next.js", 
    "TypeScript", 
    "Prisma", 
    "PostgreSQL"
  ],
  "githubLink": "https://github.com/username/devshowcase",
  "liveLink": "https://devshowcase.com"
}
\`\`\`

### 3. Presentation Tips
- Use high-quality screenshots
- Include animated GIFs for complex interactions
- Write clear, concise descriptions
- Highlight technical challenges and solutions

### 4. Project Categorization
- Group by technology
- Sort by recency
- Highlight featured projects

### Pro Tips
- Update regularly
- Link to detailed case studies
- Show progression of skills
    `,
  },
  'customization-guide': {
    title: 'Portfolio Customization',
    content: `
## Personalizing Your DevShowcase Portfolio

### 1. Theme Customization
DevShowcase offers multiple theme options:

\`\`\`typescript
enum ThemeOptions {
  CyberPunk = 'cyberpunk',
  MinimalDark = 'minimal-dark',
  ProfessionalLight = 'professional-light',
  HackerMode = 'hacker-mode'
}
\`\`\`

#### Customization Methods
- Color palette
- Font selection
- Layout preferences
- Background styles

### 2. Section Management
- Drag-and-drop sections
- Hide/show specific content blocks
- Reorder portfolio sections

### 3. Advanced Styling
- Custom CSS overrides
- Responsive design controls
- Accessibility settings

### 4. Interactive Elements
- Animated transitions
- Hover effects
- Micro-interactions

### Branding Consistency
- Match personal brand
- Use consistent color scheme
- Reflect professional personality

### Performance Optimization
- Lazy loading
- Image compression
- Minimal external dependencies
    `,
  },
  'auth-advanced': {
    title: 'Advanced Authentication',
    content: `
## Authentication Deep Dive

### 1. Authentication Strategies
- JWT (JSON Web Tokens)
- OAuth integrations
- Multi-factor authentication

\`\`\`typescript
interface AuthStrategy {
  type: 'jwt' | 'oauth' | 'mfa';
  provider?: string;
  securityLevel: number;
}
\`\`\`

### 2. Security Best Practices
- Use strong, salted password hashing
- Implement rate limiting
- Add IP-based restrictions
- Monitor login attempts

### 3. Token Management
- Short-lived access tokens
- Refresh token rotation
- Secure token storage
- Automatic token renewal

### 4. OAuth Providers
- GitHub
- Google
- LinkedIn
- Custom providers

### 5. Advanced Features
- Single Sign-On (SSO)
- Passwordless login
- Biometric authentication
    `,
  },
  'api-integration': {
    title: 'API Integration Guide',
    content: `
## Integrating DevShowcase API

### 1. API Client Setup
\`\`\`typescript
import DevShowcaseClient from '@devshowcase/api';

const client = new DevShowcaseClient({
  apiKey: process.env.DEVSHOWCASE_API_KEY,
  environment: 'production'
});
\`\`\`

### 2. Common Operations
- Fetch profile data
- Update projects
- Manage skills
- Sync experiences

### 3. Webhook Integration
Set up real-time notifications:

\`\`\`typescript
client.webhooks.register({
  event: 'profile.updated',
  url: 'https://your-webhook-endpoint.com/handler'
});
\`\`\`

### 4. Error Handling
- Implement robust error catching
- Use exponential backoff
- Provide user-friendly messages

### 5. Rate Limit Strategies
- Cache API responses
- Implement request queuing
- Use conditional requests

### Best Practices
- Keep API keys secure
- Use environment variables
- Implement comprehensive logging
    `,
  }
};

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('introduction');

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a1a] via-[#1a1a2a] to-[#2a2a3a] text-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1 bg-gray-900/50 border border-gray-800 rounded-xl p-6 h-fit sticky top-24">
            <h2 className="text-2xl font-bold mb-6 text-white">Documentation</h2>
            {sidebar.map((section, idx) => (
              <div key={idx} className="mb-6">
                <h3 className="flex items-center text-lg font-semibold mb-3 text-gray-300">
                  <section.icon className="mr-2 w-5 h-5 text-indigo-400" />
                  {section.title}
                </h3>
                <ul className="space-y-2 pl-7">
                  {section.items.map((item) => (
                    <li 
                      key={item.id} 
                      className={`cursor-pointer hover:text-white transition-colors ${
                        activeSection === item.id ? 'text-indigo-400' : 'text-gray-400'
                      }`}
                      onClick={() => setActiveSection(item.id)}
                    >
                      {item.title}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Content Area */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="md:col-span-3 bg-gray-900/50 border border-gray-800 rounded-xl p-8"
          >
            {activeSection && content[activeSection] ? (
              <>
                <h1 className="text-3xl font-bold mb-6 text-white">
                  {content[activeSection].title}
                </h1>
                <div 
                  className="prose prose-invert max-w-none 
                    prose-headings:text-white 
                    prose-a:text-indigo-400 
                    prose-code:bg-gray-800 
                    prose-code:text-gray-200 
                    prose-code:rounded 
                    prose-code:px-2 
                    prose-code:py-1 
                    prose-pre:bg-gray-900 
                    prose-pre:border 
                    prose-pre:border-gray-800"
                  dangerouslySetInnerHTML={{
                    __html: marked.parse(content[activeSection].content || '')
                  }}
                />
              </>
            ) : (
              <div className="text-center text-gray-500 py-12">
                <p>Select a section from the sidebar to view documentation</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
