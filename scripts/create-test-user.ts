const { PrismaClient } = require('@prisma/client');
const { hash } = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  try {
    // Create test user
    const hashedPassword = await hash('password123', 12);
    
    const user = await prisma.user.create({
      data: {
        email: 'test@test.com',
        password: hashedPassword,
        name: 'Test User',
        profile: {
          create: {
            title: 'Software Developer',
            bio: 'Test user bio',
            github: 'https://github.com/testuser',
            linkedin: 'https://linkedin.com/in/testuser',
            skills: ['React', 'TypeScript', 'Node.js']
          }
        },
        projects: {
          create: [
            {
              name: 'Test Project',
              description: 'A test project',
              technologies: ['React', 'TypeScript'],
              status: 'published'
            }
          ]
        }
      }
    });

    console.log('Test user created successfully:', {
      id: user.id,
      email: user.email,
      name: user.name
    });
  } catch (error) {
    console.error('Error creating test user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
