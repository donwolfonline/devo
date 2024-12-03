import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Log from "@/models/Log";

// Extend the default session types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: string;
      username: string;
    }
  }
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role: string;
    username: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: "Credentials",
      credentials: {
        username: { label: "Username or Email", type: "text" },
        password: { label: "Password", type: "password" },
        type: { label: "Login Type", type: "text" }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.username || !credentials?.password) {
            // Log failed login attempt
            await Log.create({
              type: 'LOGIN',
              message: 'Login attempt with missing credentials',
              metadata: { username: credentials?.username }
            });
            throw new Error('Please enter your username/email and password');
          }

          // Connect to database
          await connectDB();

          // Find user by username or email (case-insensitive)
          const user = await User.findOne({
            $or: [
              { email: credentials.username.toLowerCase() },
              { username: credentials.username.toLowerCase() }
            ]
          }).select('+password');

          // Check if user exists
          if (!user) {
            // Log failed login attempt
            await Log.create({
              type: 'LOGIN',
              message: `Failed login attempt: User not found (${credentials.username})`,
              metadata: { username: credentials.username }
            });
            throw new Error('User not found');
          }

          // Check if account is locked
          if (user.isLockedOut) {
            // Log locked account login attempt
            await Log.create({
              type: 'LOGIN',
              message: 'Login attempt on locked account',
              userId: user._id,
              metadata: { username: user.username }
            });
            throw new Error('Account is temporarily locked. Please try again later.');
          }

          // Verify password
          const isValidPassword = await compare(
            credentials.password, 
            user.password
          );

          if (!isValidPassword) {
            // Log failed password attempt
            await Log.create({
              type: 'LOGIN',
              message: `Failed login attempt: Invalid password (${credentials.username})`,
              userId: user._id,
              metadata: { username: credentials.username }
            });

            // Increment failed login attempts
            user.failedLoginAttempts = (user.failedLoginAttempts || 0) + 1;
            
            // Lock account after 5 failed attempts
            if (user.failedLoginAttempts >= 5) {
              user.isLockedOut = true;
              user.lockoutTime = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
            }

            await user.save();

            throw new Error('Invalid credentials');
          }

          // Reset failed login attempts on successful login
          user.failedLoginAttempts = 0;
          user.isLockedOut = false;
          user.lastLogin = new Date();
          await user.save();

          // Log successful login
          await Log.create({
            type: 'LOGIN',
            message: 'User logged in successfully',
            userId: user._id,
            metadata: { username: user.username }
          });

          return {
            id: user._id.toString(),
            name: user.name || user.username,
            email: user.email,
            role: user.role,
            username: user.username,
            image: user.image
          };
        } catch (error: any) {
          console.error('Login Error:', error);

          // Log any unexpected errors
          await Log.create({
            type: 'LOGIN',
            message: 'Unexpected login error',
            metadata: { 
              error: error.message,
              username: credentials?.username 
            }
          });

          throw error;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, account, trigger }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id as string,
          role: token.role as string,
          username: token.username as string
        };
      }
      return session;
    }
  },
  pages: {
    signIn: '/auth/sign-in',
    error: '/auth/sign-in'
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
