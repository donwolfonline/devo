import { PortfolioData } from './types';
import Image from 'next/image';
import Link from 'next/link';

export default function CreativeTemplate({ data }: { data: PortfolioData }) {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <header className="min-h-screen relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-500 opacity-20" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 text-center">
          {data.avatar && (
            <div className="mx-auto mb-8 relative w-48 h-48">
              <Image
                src={data.avatar}
                alt={data.name}
                fill
                className="rounded-full object-cover border-4 border-white/20"
              />
            </div>
          )}
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            {data.name}
          </h1>
          <p className="text-2xl md:text-3xl mb-8 text-gray-300">{data.title}</p>
          <p className="max-w-2xl mx-auto text-xl text-gray-400">{data.bio}</p>
          <div className="mt-12 flex justify-center gap-6">
            {Object.entries(data.socialLinks).map(([platform, url]) => {
              if (!url) return null;
              return (
                <Link
                  key={platform}
                  href={url}
                  className="text-gray-400 hover:text-white transition-colors text-lg"
                  target="_blank"
                >
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-white/60"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </header>

      {/* Projects Grid */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Featured Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.projects.map((project) => (
              <div
                key={project.id}
                className="group relative bg-gray-800 rounded-xl overflow-hidden transform transition-all hover:scale-105"
              >
                {project.imageUrl && (
                  <div className="relative h-48">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {project.githubUrl && (
                      <Link
                        href={project.githubUrl}
                        className="text-purple-400 hover:text-purple-300"
                        target="_blank"
                      >
                        GitHub
                      </Link>
                    )}
                    {project.liveUrl && (
                      <Link
                        href={project.liveUrl}
                        className="text-purple-400 hover:text-purple-300"
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

      {/* Skills */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Skills & Expertise
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {data.skills.map((skill) => (
              <div
                key={skill.name}
                className="group bg-gray-800 p-6 rounded-xl text-center transform transition-all hover:scale-105"
              >
                {skill.icon && (
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                    {skill.icon}
                  </div>
                )}
                <h3 className="font-semibold mb-2 group-hover:text-purple-400">
                  {skill.name}
                </h3>
                <div className="flex justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i < skill.level
                          ? 'bg-gradient-to-r from-purple-400 to-pink-400'
                          : 'bg-gray-700'
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Journey
          </h2>
          <div className="space-y-12">
            {data.experience.map((exp, index) => (
              <div
                key={index}
                className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-2 before:w-3 before:h-3 before:bg-purple-400 before:rounded-full before:shadow-lg"
              >
                <div className="bg-gray-800 p-6 rounded-xl transform transition-all hover:scale-105">
                  <h3 className="text-xl font-bold text-purple-400">
                    {exp.position}
                  </h3>
                  <p className="text-lg text-gray-300 mb-2">{exp.company}</p>
                  <p className="text-gray-400 mb-4">
                    {exp.startDate} - {exp.endDate || 'Present'}
                  </p>
                  <p className="text-gray-400 mb-4">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <footer className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Let's Connect
          </h2>
          {data.email && (
            <p className="text-xl mb-8">
              <a
                href={`mailto:${data.email}`}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {data.email}
              </a>
            </p>
          )}
          <div className="flex justify-center gap-8">
            {Object.entries(data.socialLinks).map(([platform, url]) => {
              if (!url) return null;
              return (
                <Link
                  key={platform}
                  href={url}
                  className="text-gray-400 hover:text-white transition-colors text-lg"
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
