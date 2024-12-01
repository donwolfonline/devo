import { PortfolioData } from './types';
import Image from 'next/image';
import Link from 'next/link';

export default function DeveloperTemplate({ data }: { data: PortfolioData }) {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 font-mono">
      {/* Terminal-like Header */}
      <header className="pt-16 pb-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="space-y-2">
              <p className="text-green-400">$ whoami</p>
              <p>{data.name}</p>
              <p className="text-green-400">$ cat title.txt</p>
              <p>{data.title}</p>
              <p className="text-green-400">$ cat bio.txt</p>
              <p className="whitespace-pre-wrap">{data.bio}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Skills Section */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold mb-6 text-green-400">
            ./list-skills.sh
          </h2>
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(
                data.skills.reduce((acc, skill) => {
                  if (!acc[skill.category]) {
                    acc[skill.category] = [];
                  }
                  acc[skill.category].push(skill);
                  return acc;
                }, {} as Record<string, typeof data.skills>)
              ).map(([category, skills]) => (
                <div key={category}>
                  <h3 className="text-yellow-400 mb-3">{category}/</h3>
                  <ul className="space-y-2">
                    {skills.map((skill) => (
                      <li key={skill.name} className="flex items-center gap-2">
                        <div className="flex-1">{skill.name}</div>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-4 ${
                                i < skill.level
                                  ? 'bg-green-500'
                                  : 'bg-gray-700'
                              }`}
                            />
                          ))}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold mb-6 text-green-400">
            ./list-projects.sh
          </h2>
          <div className="space-y-6">
            {data.projects.map((project) => (
              <div
                key={project.id}
                className="bg-gray-800 rounded-lg p-6 shadow-lg"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {project.imageUrl && (
                    <div className="md:w-1/3">
                      <div className="relative h-48 rounded-lg overflow-hidden">
                        <Image
                          src={project.imageUrl}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-yellow-400 mb-2">
                      {project.title}
                    </h3>
                    <p className="mb-4 text-gray-400">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-gray-700 rounded text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    {project.stats && (
                      <div className="flex gap-4 text-sm text-gray-400 mb-4">
                        {project.stats.stars && (
                          <span>⭐ {project.stats.stars}</span>
                        )}
                        {project.stats.forks && (
                          <span>🔄 {project.stats.forks}</span>
                        )}
                        {project.stats.commits && (
                          <span>📝 {project.stats.commits}</span>
                        )}
                      </div>
                    )}
                    <div className="flex gap-4">
                      {project.githubUrl && (
                        <Link
                          href={project.githubUrl}
                          className="text-green-400 hover:text-green-300"
                          target="_blank"
                        >
                          git clone
                        </Link>
                      )}
                      {project.liveUrl && (
                        <Link
                          href={project.liveUrl}
                          className="text-green-400 hover:text-green-300"
                          target="_blank"
                        >
                          ./run-demo.sh
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold mb-6 text-green-400">
            ./show-experience.sh
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg p-6 shadow-lg"
              >
                <div className="flex flex-col md:flex-row justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-yellow-400">
                      {exp.position}
                    </h3>
                    <p className="text-gray-400">{exp.company}</p>
                  </div>
                  <p className="text-gray-500">
                    {exp.startDate} - {exp.endDate || 'Present'}
                  </p>
                </div>
                <p className="mb-4 text-gray-400">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-gray-700 rounded text-sm"
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

      {/* Education & Certifications */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold mb-6 text-green-400">
            ./show-credentials.sh
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
              <h3 className="text-yellow-400 mb-4">Education/</h3>
              <div className="space-y-4">
                {data.education.map((edu, index) => (
                  <div key={index}>
                    <p className="font-bold">{edu.institution}</p>
                    <p className="text-gray-400">
                      {edu.degree} in {edu.field}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {edu.startDate} - {edu.endDate || 'Present'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
              <h3 className="text-yellow-400 mb-4">Certifications/</h3>
              <div className="space-y-4">
                {data.certifications.map((cert, index) => (
                  <div key={index}>
                    <p className="font-bold">{cert.name}</p>
                    <p className="text-gray-400">{cert.issuer}</p>
                    <p className="text-gray-500 text-sm">{cert.date}</p>
                    {cert.url && (
                      <Link
                        href={cert.url}
                        className="text-green-400 hover:text-green-300 text-sm"
                        target="_blank"
                      >
                        verify
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <footer className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold mb-6 text-green-400">
            ./contact.sh
          </h2>
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="space-y-2">
              {data.email && (
                <p>
                  <span className="text-yellow-400">EMAIL:</span>{' '}
                  <a
                    href={`mailto:${data.email}`}
                    className="text-green-400 hover:text-green-300"
                  >
                    {data.email}
                  </a>
                </p>
              )}
              {Object.entries(data.socialLinks).map(([platform, url]) => {
                if (!url) return null;
                return (
                  <p key={platform}>
                    <span className="text-yellow-400">
                      {platform.toUpperCase()}:
                    </span>{' '}
                    <Link
                      href={url}
                      className="text-green-400 hover:text-green-300"
                      target="_blank"
                    >
                      {url}
                    </Link>
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
