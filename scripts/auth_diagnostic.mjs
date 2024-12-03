import { PrismaClient } from '@prisma/client'
import pkg from 'bcryptjs'
const { compare, hash } = pkg

async function authDiagnostic(username, password) {
  const prisma = new PrismaClient()
  
  console.log('🔍 Authentication Diagnostic Tool 🔍')
  console.log('-----------------------------------')

  try {
    // Step 1: Find User
    console.log(`\n📋 Step 1: Finding user with username: ${username}`)
    const user = await prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        password: true,
      }
    })

    if (!user) {
      console.error(`❌ No user found with username: ${username}`)
      return false
    }

    console.log('✅ User found successfully')
    console.log('User Details:')
    console.log(`ID: ${user.id}`)
    console.log(`Username: ${user.username}`)
    console.log(`Email: ${user.email}`)
    console.log(`Name: ${user.name}`)

    // Step 2: Password Verification
    console.log('\n🔐 Step 2: Password Verification')
    const isPasswordValid = await compare(password, user.password)
    
    console.log(`Password Verification: ${isPasswordValid ? '✅ Successful' : '❌ Failed'}`)

    return isPasswordValid
  } catch (error) {
    console.error('❌ Diagnostic Error:', error)
    return false
  } finally {
    await prisma.$disconnect()
  }
}

// Usage: node auth_diagnostic.mjs <username> <password>
const username = process.argv[2]
const password = process.argv[3]

if (!username || !password) {
  console.error('Please provide username and password')
  process.exit(1)
}

authDiagnostic(username, password)
