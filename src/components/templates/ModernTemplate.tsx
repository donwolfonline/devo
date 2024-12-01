import { PortfolioData } from './types';
import Image from 'next/image';
import Link from 'next/link';

export default function ModernTemplate({ data }: { data: PortfolioData }) {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-lg font-semibold">{data.name}</span>
            </div>
            <div className="flex items-center space-x-6">
              {Object.entries(data.socialLinks).map(([platform, url]) => {
                if (!url) return null;
                return (
                  <Link
                    key={platform}
                    href={url}
                    className="text-gray-600 hover:text-gray-900"
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

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">{data.name}</h1>
              <p className="text-2xl text-gray-600 mb-6">{data.title}</p>
              <p className="text-gray-600 mb-8 text-lg">{data.bio}</p>
              {data.email && (
                <a
                  href={`mailto:${data.email}`}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Get in Touch
                </a>
              )}
            </div>
            {data.avatar && (
              <div className="relative h-96 rounded-2xl overflow-hidden">
                <Image
                  src={data.avatar}
                  alt={data.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {project.imageUrl && (
                  <div className="relative h-48">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {project.githubUrl && (
                      <Link
                        href={project.githubUrl}
                        className="text-indigo-600 hover:text-indigo-700"
                        target="_blank"
                      >
                        View Code
                      </Link>
                    )}
                    {project.liveUrl && (
                      <Link
                        href={project.liveUrl}
                        className="text-indigo-600 hover:text-indigo-700"
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
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">Skills & Technologies</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {data.skills.map((skill) => (
              <div
                key={skill.name}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">{skill.name}</h3>
                  {skill.icon && (
                    <span className="text-2xl text-gray-600">{skill.icon}</span>
                  )}
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: `${skill.level * 20}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">Professional Experience</h2>
          <div className="space-y-12">
            {data.experience.map((exp, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div>
                    <p className="text-gray-500">
                      {exp.startDate} - {exp.endDate || 'Present'}
                    </p>
                  </div>
                  <div className="md:col-span-3">
                    <h3 className="text-xl font-semibold mb-2">{exp.position}</h3>
                    <p className="text-indigo-600 mb-4">{exp.company}</p>
                    <p className="text-gray-600 mb-6">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-8">Education</h2>
              <div className="space-y-6">
                {data.education.map((edu, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-semibold text-lg mb-2">
                      {edu.institution}
                    </h3>
                    <p className="text-gray-600">
                      {edu.degree} in {edu.field}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {edu.startDate} - {edu.endDate || 'Present'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-8">Certifications</h2>
              <div className="space-y-6">
                {data.certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-semibold text-lg mb-2">{cert.name}</h3>
                    <p className="text-gray-600">{cert.issuer}</p>
                    <p className="text-gray-500 text-sm mb-2">{cert.date}</p>
                    {cert.url && (
                      <Link
                        href={cert.url}
                        className="text-indigo-600 hover:text-indigo-700 text-sm"
                        target="_blank"
                      >
                        View Certificate
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <footer className="py-20 px-4 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
          {data.email && (
            <p className="text-xl mb-8">
              <a
                href={`mailto:${data.email}`}
                className="text-indigo-400 hover:text-indigo-300"
              >
                {data.email}
              </a>
            </p>
          )}
          <div className="flex justify-center gap-6">
            {Object.entries(data.socialLinks).map(([platform, url]) => {
              if (!url) return null;
              return (
                <Link
                  key={platform}
                  href={url}
                  className="text-gray-400 hover:text-white transition-colors"
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
