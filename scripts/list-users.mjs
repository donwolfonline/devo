import { PrismaClient } from '@prisma/client'

async function listUsers() {
  const prisma = new PrismaClient()

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        username: true
      }
    })

    console.log('Existing Users:')
    console.table(users)
  } catch (error) {
    console.error('Error listing users:', error)
  } finally {
    await prisma.$disconnect()
  }
}

listUsers()
