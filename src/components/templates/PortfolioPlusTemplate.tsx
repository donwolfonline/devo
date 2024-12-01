import { PortfolioData } from './types';
import Image from 'next/image';
import Link from 'next/link';

export default function PortfolioPlusTemplate({ data }: { data: PortfolioData }) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
                {data.name}
              </span>
            </div>
            <div className="flex items-center space-x-6">
              {Object.entries(data.socialLinks).map(([platform, url]) => {
                if (!url) return null;
                return (
                  <Link
                    key={platform}
                    href={url}
                    className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    target="_blank"
                  >
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with 3D Card Effect */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
                {data.name}
              </h1>
              <p className="text-2xl text-gray-600 dark:text-gray-300">{data.title}</p>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                {data.bio}
              </p>
              {data.email && (
                <div className="pt-4">
                  <a
                    href={`mailto:${data.email}`}
                    className="inline-flex items-center px-6 py-3 rounded-full text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Contact Me
                  </a>
                </div>
              )}
            </div>
            {data.avatar && (
              <div className="relative group perspective">
                <div className="relative h-96 rounded-2xl overflow-hidden transform transition-transform duration-500 group-hover:rotate-y-12">
                  <Image
                    src={data.avatar}
                    alt={data.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-pink-600/20 group-hover:opacity-0 transition-opacity" />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Interactive Skills Chart */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
            Skills & Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.skills.map((skill) => (
              <div
                key={skill.name}
                className="group bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                    {skill.name}
                  </h3>
                  {skill.icon && (
                    <span className="text-2xl group-hover:scale-125 transition-transform duration-300">
                      {skill.icon}
                    </span>
                  )}
                </div>
                <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-500 group-hover:scale-x-110 origin-left"
                    style={{ width: `${skill.level * 20}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects with Card Flip */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.projects.map((project) => (
              <div
                key={project.id}
                className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 perspective"
              >
                {project.imageUrl && (
                  <div className="relative h-48 transform-style-3d group-hover:rotate-y-180 transition-transform duration-700">
                    <div className="absolute inset-0">
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-pink-600/20" />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-sm rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {project.githubUrl && (
                      <Link
                        href={project.githubUrl}
                        className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                        target="_blank"
                      >
                        View Code
                      </Link>
                    )}
                    {project.liveUrl && (
                      <Link
                        href={project.liveUrl}
                        className="text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 transition-colors"
                        target="_blank"
                      >
                        Live Demo
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Experience */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
            Professional Journey
          </h2>
          <div className="space-y-8">
            {data.experience.map((exp, index) => (
              <div
                key={index}
                className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-gradient-to-b before:from-purple-600 before:to-pink-600 group"
              >
                <div className="absolute left-0 top-0 w-2 h-2 -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 group-hover:scale-150 transition-transform" />
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div>
                      <p className="text-purple-600 dark:text-purple-400">
                        {exp.startDate} - {exp.endDate || 'Present'}
                      </p>
                    </div>
                    <div className="md:col-span-3">
                      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                        {exp.position}
                      </h3>
                      <p className="text-pink-600 dark:text-pink-400 mb-4">
                        {exp.company}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {exp.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-sm rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <footer className="py-20 px-4 bg-gradient-to-br from-purple-900 to-pink-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Let's Connect</h2>
          {data.email && (
            <a
              href={`mailto:${data.email}`}
              className="inline-block px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all duration-300 mb-8 group"
            >
              <span className="text-xl group-hover:scale-105 inline-block transition-transform">
                {data.email}
              </span>
            </a>
          )}
          <div className="flex justify-center gap-6">
            {Object.entries(data.socialLinks).map(([platform, url]) => {
              if (!url) return null;
              return (
                <Link
                  key={platform}
                  href={url}
                  className="text-white/80 hover:text-white transition-colors"
                  target="_blank"
                >
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </Link>
              );
            })}
          </div>
        </div>
      </footer>
    </div>
  );
}
