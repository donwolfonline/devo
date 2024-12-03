import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  try {
    const hashedPassword = await bcrypt.hash('SuperAdmin@123', 12);
    
    const admin = await prisma.user.upsert({
      where: { email: 'admin@devoapp.com' },
      update: {
        role: 'SUPER_ADMIN',
        password: hashedPassword
      },
      create: {
        email: 'admin@devoapp.com',
        name: 'Super Admin',
        username: 'superadmin',
        password: hashedPassword,
        role: 'SUPER_ADMIN'
      }
    });
    
    console.log('Super admin created successfully:', admin);
  } catch (error) {
    console.error('Error creating super admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
