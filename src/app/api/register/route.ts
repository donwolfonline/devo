import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { z } from 'zod';

// More permissive validation schema
const registerSchema = z.object({
  username: z.string()
    .trim()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(20, { message: "Username must be at most 20 characters" })
    .regex(/^[a-zA-Z0-9_-]+$/, { message: "Username can only contain letters, numbers, underscores, and hyphens" }),
  email: z.string()
    .trim()
    .email({ message: "Invalid email address" }),
  password: z.string()
    .trim()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 
      { message: "Password must include uppercase, lowercase, number, and special character" }),
  name: z.string()
    .trim()
    .optional()
});

export async function POST(req: NextRequest) {
  try {
    // Ensure the request is JSON
    const contentType = req.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('❌ Invalid Content-Type:', contentType);
      return new Response(JSON.stringify({ 
        error: 'Invalid request',
        details: 'Content-Type must be application/json'
      }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Extensive body parsing with multiple fallback methods
    let body;
    try {
      // Method 1: Direct JSON parsing
      body = await req.json();
      console.log('🔍 Body Parsed Successfully (Method 1)');
    } catch (parseError1) {
      console.error('❌ JSON Parsing Error (Method 1):', parseError1);
      
      try {
        // Method 2: Text parsing
        const rawBody = await req.text();
        console.error('🔍 Raw Request Body:', rawBody);
        body = JSON.parse(rawBody);
        console.log('🔍 Body Parsed Successfully (Method 2)');
      } catch (parseError2) {
        console.error('❌ Text Parsing Error (Method 2):', parseError2);
        
        return new Response(JSON.stringify({ 
          error: 'Invalid request body',
          details: 'Unable to parse request body',
          rawError: parseError2 instanceof Error ? parseError2.message : 'Unknown parsing error'
        }), { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    console.log('🔍 Parsed Request Body:', JSON.stringify(body, null, 2));
    
    // Validate input
    const validationResult = registerSchema.safeParse(body);
    
    if (!validationResult.success) {
      console.error('❌ Validation Errors:', JSON.stringify(validationResult.error.errors, null, 2));
      return new Response(JSON.stringify({ 
        error: 'Invalid input',
        details: validationResult.error.errors.map(err => ({
          path: err.path.join('.'),
          message: err.message
        }))
      }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { username, email, password, name } = validationResult.data;

    // Connect to database
    await connectDB();

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      console.error('❌ User Already Exists:', {
        existingUsername: existingUser.username,
        existingEmail: existingUser.email,
        inputUsername: username,
        inputEmail: email
      });
      return new Response(JSON.stringify({ 
        error: 'Username or email already exists',
        details: {
          existingUsername: existingUser.username === username,
          existingEmail: existingUser.email === email
        }
      }), { 
        status: 409,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Hash password
    let hashedPassword;
    try {
      hashedPassword = await hash(password, 12);
    } catch (hashError) {
      console.error('❌ Password Hashing Error:', hashError);
      return new Response(JSON.stringify({ 
        error: 'Password hashing failed',
        details: hashError instanceof Error ? hashError.message : 'Unknown hashing error'
      }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Create user
    try {
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
        name: name || username,
      });

      // Return success without password
      const { password: _, ...userWithoutPassword } = user.toObject();
      
      console.log('✅ New user registered:', JSON.stringify(userWithoutPassword, null, 2));

      return new Response(JSON.stringify({
        message: 'User registered successfully',
        user: userWithoutPassword,
      }), { 
        status: 201,
        headers: { 'Content-Type': 'application/json' }
      });

    } catch (createUserError) {
      console.error('❌ User Creation Error:', createUserError);
      return new Response(JSON.stringify({ 
        error: 'Failed to create user',
        details: createUserError instanceof Error ? createUserError.message : 'Unknown user creation error'
      }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

  } catch (error) {
    console.error('🚨 Unexpected Registration Error:', error);
    return new Response(JSON.stringify({ 
      error: 'Registration failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
