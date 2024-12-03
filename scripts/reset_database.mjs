import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function resetDatabase() {
  try {
    // Delete all records from all tables
    await prisma.user.deleteMany();
    
    console.log('🗑️ All users have been deleted from the database.');
    console.log('🔄 Database has been reset successfully.');
  } catch (error) {
    console.error('❌ Error resetting database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

resetDatabase();
