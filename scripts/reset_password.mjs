import pkg from 'bcryptjs'
const { hash } = pkg
import { PrismaClient } from '@prisma/client'

async function resetPassword(username, newPassword) {
  const prisma = new PrismaClient()
  
  try {
    // Hash the new password
    const hashedPassword = await hash(newPassword, 10)
    
    // Update user's password
    const updatedUser = await prisma.user.update({
      where: { username },
      data: { password: hashedPassword }
    })
    
    console.log(`Password successfully reset for user: ${updatedUser.username}`)
  } catch (error) {
    console.error('Error resetting password:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Usage: node reset_password.mjs <username> <new_password>
const username = process.argv[2]
const newPassword = process.argv[3]

if (!username || !newPassword) {
  console.error('Please provide username and new password')
  process.exit(1)
}

resetPassword(username, newPassword)
