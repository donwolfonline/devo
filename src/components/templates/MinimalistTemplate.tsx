import { PortfolioData } from './types';
import Image from 'next/image';
import Link from 'next/link';

export default function MinimalistTemplate({ data }: { data: PortfolioData }) {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Header */}
      <header className="py-20 px-4 text-center">
        {data.avatar && (
          <div className="mx-auto mb-6 relative w-32 h-32">
            <Image
              src={data.avatar}
              alt={data.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
        )}
        <h1 className="text-4xl font-bold mb-2">{data.name}</h1>
        <p className="text-xl text-gray-600 mb-4">{data.title}</p>
        <p className="max-w-2xl mx-auto text-gray-600">{data.bio}</p>
      </header>

      {/* Projects */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.projects.map((project) => (
              <div key={project.id} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-100 text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  {project.githubUrl && (
                    <Link
                      href={project.githubUrl}
                      className="text-gray-600 hover:text-gray-900"
                      target="_blank"
                    >
                      GitHub
                    </Link>
                  )}
                  {project.liveUrl && (
                    <Link
                      href={project.liveUrl}
                      className="text-gray-600 hover:text-gray-900"
                      target="_blank"
                    >
                      Live Demo
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.skills.map((skill) => (
              <div
                key={skill.name}
                className="p-4 bg-gray-50 rounded-lg text-center"
              >
                <h3 className="font-semibold mb-2">{skill.name}</h3>
                <div className="flex justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i < skill.level ? 'bg-gray-800' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Experience</h2>
          <div className="space-y-8">
            {data.experience.map((exp, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg">{exp.position}</h3>
                <p className="text-gray-600 mb-2">{exp.company}</p>
                <p className="text-sm text-gray-500 mb-4">
                  {exp.startDate} - {exp.endDate || 'Present'}
                </p>
                <p className="text-gray-700 mb-4">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-100 text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center text-gray-600">
        <div className="flex justify-center gap-6 mb-4">
          {Object.entries(data.socialLinks).map(([platform, url]) => {
            if (!url) return null;
            return (
              <Link
                key={platform}
                href={url}
                className="hover:text-gray-900"
                target="_blank"
              >
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
              </Link>
            );
          })}
        </div>
        {data.email && (
          <p>
            Contact me at{' '}
            <a href={`mailto:${data.email}`} className="hover:text-gray-900">
              {data.email}
            </a>
          </p>
        )}
      </footer>
    </div>
  );
}
