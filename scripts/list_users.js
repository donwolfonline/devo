const { PrismaClient } = require('@prisma/client')

async function listUsers() {
  const prisma = new PrismaClient()
  
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        createdAt: true
      }
    })
    
    console.log('Registered Users:')
    users.forEach(user => {
      console.log(`
ID: ${user.id}
Username: ${user.username}
Email: ${user.email}
Name: ${user.name}
Created: ${user.createdAt}
---`)
    })
  } catch (error) {
    console.error('Error fetching users:', error)
  } finally {
    await prisma.$disconnect()
  }
}

listUsers()
