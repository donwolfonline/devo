import pkg from 'bcryptjs'
const { compare } = pkg
import { PrismaClient } from '@prisma/client'

async function verifyUser(username, password) {
  const prisma = new PrismaClient()
  
  try {
    const user = await prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        password: true
      }
    })

    if (!user) {
      console.error(`No user found with username: ${username}`)
      return false
    }

    const isPasswordValid = await compare(password, user.password)
    
    console.log(`Password verification for ${username}:`, {
      passwordValid: isPasswordValid,
      userId: user.id
    })

    return isPasswordValid
  } catch (error) {
    console.error('Error verifying user:', error)
    return false
  } finally {
    await prisma.$disconnect()
  }
}

// Usage: node verify_user.mjs <username> <password>
const username = process.argv[2]
const password = process.argv[3]

if (!username || !password) {
  console.error('Please provide username and password')
  process.exit(1)
}

verifyUser(username, password)
