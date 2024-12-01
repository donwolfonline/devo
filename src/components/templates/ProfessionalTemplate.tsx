import { PortfolioData } from './types';
import Image from 'next/image';
import Link from 'next/link';

export default function ProfessionalTemplate({ data }: { data: PortfolioData }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {data.avatar && (
              <div className="w-40 h-40 relative">
                <Image
                  src={data.avatar}
                  alt={data.name}
                  fill
                  className="rounded-full object-cover border-4 border-white shadow-lg"
                />
              </div>
            )}
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{data.name}</h1>
              <p className="text-xl md:text-2xl mb-4 opacity-90">{data.title}</p>
              <p className="max-w-2xl text-lg opacity-80">{data.bio}</p>
              <div className="flex gap-4 mt-6 justify-center md:justify-start">
                {Object.entries(data.socialLinks).map(([platform, url]) => {
                  if (!url) return null;
                  return (
                    <Link
                      key={platform}
                      href={url}
                      className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-full transition-colors"
                      target="_blank"
                    >
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Skills Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">
            Technical Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(
              data.skills.reduce((acc, skill) => {
                if (!acc[skill.category]) {
                  acc[skill.category] = [];
                }
                acc[skill.category].push(skill);
                return acc;
              }, {} as Record<string, typeof data.skills>)
            ).map(([category, skills]) => (
              <div
                key={category}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <h3 className="text-xl font-semibold mb-4 text-blue-600">
                  {category}
                </h3>
                <div className="space-y-4">
                  {skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-gray-500">
                          {skill.level * 20}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${skill.level * 20}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.projects.map((project) => (
              <div
                key={project.id}
                className="bg-gray-50 rounded-xl overflow-hidden shadow-md"
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
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.stats && (
                    <div className="flex gap-4 text-sm text-gray-600 mb-4">
                      {project.stats.stars && (
                        <span>⭐ {project.stats.stars} stars</span>
                      )}
                      {project.stats.forks && (
                        <span>🔄 {project.stats.forks} forks</span>
                      )}
                    </div>
                  )}
                  <div className="flex gap-4">
                    {project.githubUrl && (
                      <Link
                        href={project.githubUrl}
                        className="text-blue-600 hover:text-blue-800"
                        target="_blank"
                      >
                        View Source
                      </Link>
                    )}
                    {project.liveUrl && (
                      <Link
                        href={project.liveUrl}
                        className="text-blue-600 hover:text-blue-800"
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

      {/* Experience */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">
            Professional Experience
          </h2>
          <div className="space-y-8">
            {data.experience.map((exp, index) => (
              <div
                key={index}
                className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-2 before:w-3 before:h-3 before:bg-blue-600 before:rounded-full before:shadow-lg"
              >
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h3 className="text-xl font-semibold text-blue-600">
                    {exp.position}
                  </h3>
                  <p className="text-lg text-gray-700 mb-2">{exp.company}</p>
                  <p className="text-gray-500 mb-4">
                    {exp.startDate} - {exp.endDate || 'Present'}
                  </p>
                  <p className="text-gray-600 mb-4">{exp.description}</p>
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
            ))}
          </div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">
            Education & Certifications
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-6 text-blue-600">
                Education
              </h3>
              <div className="space-y-6">
                {data.education.map((edu, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-xl">
                    <h4 className="font-semibold">{edu.institution}</h4>
                    <p className="text-gray-600">
                      {edu.degree} in {edu.field}
                    </p>
                    <p className="text-sm text-gray-500">
                      {edu.startDate} - {edu.endDate || 'Present'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-6 text-blue-600">
                Certifications
              </h3>
              <div className="space-y-6">
                {data.certifications.map((cert, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-xl">
                    <h4 className="font-semibold">{cert.name}</h4>
                    <p className="text-gray-600">{cert.issuer}</p>
                    <p className="text-sm text-gray-500">{cert.date}</p>
                    {cert.url && (
                      <Link
                        href={cert.url}
                        className="text-blue-600 hover:text-blue-800 text-sm"
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
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
          {data.email && (
            <p className="mb-6">
              <a
                href={`mailto:${data.email}`}
                className="text-blue-400 hover:text-blue-300"
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
