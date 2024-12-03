import { motion } from 'framer-motion';
import { Metadata } from 'next';

// This would typically come from your database
const mockUserData = {
  username: 'johndoe',
  name: 'John Doe',
  bio: 'Full-stack developer & open source contributor',
  avatar: 'https://github.com/johndoe.png',
  links: [
    {
      platform: 'GitHub',
      url: 'https://github.com/johndoe',
      icon: 'Github',
      color: 'hover:bg-gray-800'
    },
  ],
  customLinks: [
    {
      title: 'My Tech Blog',
      url: 'https://blog.example.com',
      description: 'I write about web development and tech trends'
    },
    {
      title: 'Latest Project',
      url: 'https://project.example.com',
      description: 'Check out my newest open source contribution'
    }
  ]
};

export const metadata: Metadata = {
  title: 'Links | Portfolio',
  description: 'My personal links collection'
};

export default function LinksPage() {
  const userData = mockUserData;

  return (
    <div className="min-h-screen py-12 px-4 bg-black text-white">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-8"
        >
          <img 
            src={userData.avatar} 
            alt={`${userData.name}'s avatar`} 
            className="w-24 h-24 rounded-full mb-4 object-cover border-4 border-purple-500"
          />
          <h1 className="text-2xl font-bold">{userData.name}</h1>
          <p className="text-gray-400 text-center">{userData.bio}</p>
        </motion.div>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Social Links</h2>
          <div className="grid grid-cols-3 gap-4">
            {userData.links.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  flex flex-col items-center justify-center 
                  p-4 rounded-lg transition-all duration-300 
                  ${link.color} hover:scale-105 hover:shadow-lg
                `}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="text-white">{link.platform}</span>
              </motion.a>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">My Links</h2>
          <div className="space-y-4">
            {userData.customLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  block bg-gray-800 p-4 rounded-lg 
                  hover:bg-gray-700 transition-colors duration-300
                "
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{link.title}</h3>
                    <p className="text-gray-400 text-sm">{link.description}</p>
                  </div>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6 text-gray-500" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                    />
                  </svg>
                </div>
              </motion.a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
