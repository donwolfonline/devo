import { PrismaClient } from '@prisma/client'
import pkg from 'bcryptjs'
const { compare, hash } = pkg

async function fullAuthDiagnostic(username, password) {
  const prisma = new PrismaClient()
  
  console.log('🔍 Full Authentication Diagnostic Tool 🔍')
  console.log('----------------------------------------')

  try {
    // Step 1: Database Connection
    console.log('\n📡 Step 1: Database Connection')
    try {
      await prisma.$connect()
      console.log('✅ Database connection successful')
    } catch (dbError) {
      console.error('❌ Database Connection Error:', dbError)
      return false
    }

    // Step 2: Find User
    console.log(`\n📋 Step 2: Finding user with username: ${username}`)
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

    // Step 3: Password Verification
    console.log('\n🔐 Step 3: Password Verification')
    const isPasswordValid = await compare(password, user.password)
    
    console.log(`Password Verification: ${isPasswordValid ? '✅ Successful' : '❌ Failed'}`)

    // Step 4: Token Generation Simulation
    console.log('\n🎫 Step 4: Token Generation Simulation')
    const simulatedToken = {
      id: user.id,
      username: user.username,
      email: user.email,
      name: user.name
    }
    console.log('Simulated Token:', JSON.stringify(simulatedToken, null, 2))

    // Step 5: Session Creation Simulation
    console.log('\n👤 Step 5: Session Creation Simulation')
    const simulatedSession = {
      user: {
        id: simulatedToken.id,
        username: simulatedToken.username,
        email: simulatedToken.email,
        name: simulatedToken.name
      }
    }
    console.log('Simulated Session:', JSON.stringify(simulatedSession, null, 2))

    return {
      userFound: true,
      passwordValid: isPasswordValid,
      token: simulatedToken,
      session: simulatedSession
    }
  } catch (error) {
    console.error('❌ Diagnostic Error:', error)
    return false
  } finally {
    await prisma.$disconnect()
  }
}

// Usage: node full_auth_diagnostic.mjs <username> <password>
const username = process.argv[2]
const password = process.argv[3]

if (!username || !password) {
  console.error('Please provide username and password')
  process.exit(1)
}

fullAuthDiagnostic(username, password)
