import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { z } from "zod";

const userSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  username: z.string().min(3, "Username must be at least 3 characters").max(20, "Username must be at most 20 characters"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name, username } = userSchema.parse(body);

    await connectDB();

    // Check if user already exists by email or username
    const existingUser = await User.findOne({
      $or: [
        { email: email.toLowerCase() },
        { username: username.toLowerCase() }
      ]
    });

    if (existingUser) {
      return NextResponse.json(
        { 
          error: existingUser.email === email 
            ? "User with this email already exists" 
            : "Username is already taken" 
        },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await User.create({
      email: email.toLowerCase(),
      password: hashedPassword,
      name,
      username: username.toLowerCase(),
      role: 'user',
      profile: {
        headline: `${name}'s Developer Portfolio`,
        summary: `Welcome to my professional portfolio. I'm passionate about creating innovative solutions.`
      }
    });

    return NextResponse.json(
      {
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          username: user.username,
          role: user.role
        },
        message: "Account created successfully"
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: "Invalid input", 
          details: error.errors.map(e => e.message) 
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
