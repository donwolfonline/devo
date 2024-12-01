import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Delete existing data to ensure clean slate
  await prisma.project.deleteMany();
  await prisma.portfolioStats.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  // Create test user with a strong, memorable password
  const hashedPassword = await bcrypt.hash('DevShowcase2024!', 10);
  const user = await prisma.user.create({
    data: {
      email: 'developer@devshowcase.com',
      name: 'DevShowcase Admin',
      username: 'devshowcase_admin',
      password: hashedPassword,
      bio: 'DevShowcase Portfolio Platform Administrator',
      location: 'Global',
      company: 'DevShowcase',
      website: 'https://devshowcase.com',
      github: 'devshowcase-admin',
      portfolioStats: {
        create: {
          portfolioViews: 0,
          profileVisits: 0,
        },
      },
      projects: {
        create: [
          {
            title: 'DevShowcase Platform',
            description: 'A comprehensive developer portfolio platform',
            technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
            featured: true,
          },
        ],
      },
    },
  });

  console.log('Created test user:', user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
