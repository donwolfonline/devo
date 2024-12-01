import { PrismaClient } from '@prisma/client'

async function addProjects() {
  const prisma = new PrismaClient()

  try {
    const user = await prisma.user.findFirst({
      where: { email: 'admin@devshowcase.com' }
    })

    if (!user) {
      console.error('User not found')
      return
    }

    const projects = [
      {
        title: 'DevShowcase Portfolio',
        description: 'A comprehensive developer portfolio platform with dynamic user profiles and theme customization.',
        technologies: ['Next.js', 'TypeScript', 'Prisma', 'Tailwind CSS'],
        demoUrl: 'https://devshowcase.com',
        githubUrl: 'https://github.com/yourusername/devshowcase',
        featured: true,
        userId: user.id
      },
      {
        title: 'AI Code Assistant',
        description: 'An intelligent code generation and debugging tool powered by advanced machine learning models.',
        technologies: ['Python', 'OpenAI', 'FastAPI', 'React'],
        demoUrl: 'https://codecompanion.ai',
        githubUrl: 'https://github.com/yourusername/ai-code-assistant',
        featured: false,
        userId: user.id
      }
    ]

    await prisma.project.createMany({
      data: projects
    })

    console.log('Projects added successfully')
  } catch (error) {
    console.error('Error adding projects:', error)
  } finally {
    await prisma.$disconnect()
  }
}

addProjects()
