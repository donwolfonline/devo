import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    // Find our test user
    const user = await prisma.user.findUnique({
      where: { email: 'developer@devshowcase.com' }
    });

    if (!user) {
      console.error('Test user not found. Please run the seed script first.');
      return;
    }

    // Delete existing profile if it exists
    await prisma.linkBioProfile.deleteMany({
      where: { username: 'devshowcase_admin' }
    });

    // Create a test profile
    const profile = await prisma.linkBioProfile.create({
      data: {
        userId: user.id,
        username: 'devshowcase_admin',
        subdomain: 'devshowcase',
        name: 'DevShowcase Admin',
        bio: 'Full-stack developer passionate about building great developer tools',
        template: 'gradient',
        customization: {
          primaryColor: '#9333EA',
          secondaryColor: '#A855F7',
          backgroundColor: '#000000',
          textColor: '#FFFFFF'
        },
        socialLinks: {
          create: [
            {
              platform: 'github',
              url: 'https://github.com/devshowcase-admin'
            },
            {
              platform: 'twitter',
              url: 'https://twitter.com/devshowcase'
            }
          ]
        },
        customLinks: {
          create: [
            {
              title: 'My Portfolio',
              url: 'https://devshowcase.com/portfolio',
              icon: '🎨',
              order: 0
            },
            {
              title: 'Blog',
              url: 'https://devshowcase.com/blog',
              icon: '✍️',
              order: 1
            }
          ]
        },
        analytics: {
          create: {
            totalViews: 0,
            viewsByCountry: {},
            deviceTypes: {},
            viewsOverTime: []
          }
        }
      }
    });

    console.log('Created test profile:', profile);
  } catch (error) {
    console.error('Error creating test profile:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
