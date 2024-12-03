import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export const authOptions: NextAuthOptions = {
  debug: true,
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        type: { label: "Login Type", type: "text" }
      },
      async authorize(credentials, req) {
        try {
          console.log('Auth attempt:', {
            username: credentials?.username,
            type: credentials?.type,
            hasPassword: !!credentials?.password
          });

          if (!credentials?.username || !credentials?.password) {
            console.log('Missing credentials');
            throw new Error('Please enter your username and password');
          }

          await connectDB();
          console.log('Connected to DB');

          // First find the user without filtering by role
          const user = await User.findOne({
            username: credentials.username.toLowerCase()
          }).select('+password');

          console.log('User found:', {
            exists: !!user,
            role: user?.role,
            requestedType: credentials.type
          });

          if (!user) {
            console.log('User not found');
            throw new Error('Invalid credentials');
          }

          // For testing: use direct password comparison
          const isValidPassword = credentials.password === 'password123';
          console.log('Password valid:', isValidPassword);

          if (!isValidPassword) {
            console.log('Invalid password');
            throw new Error('Invalid credentials');
          }

          // Then check role if trying to access superadmin
          if (credentials.type === 'superadmin' && user.role !== 'SUPER_ADMIN') {
            console.log('Not a superadmin');
            throw new Error('Invalid credentials');
          }

          console.log('Login successful');
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
            username: user.username
          };
        } catch (error) {
          console.error('Auth error:', error);
          throw error;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log('JWT Callback:', { token, user });
      if (user) {
        token.role = user.role;
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      console.log('Session Callback:', { session, token });
      if (token) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
        session.user.username = token.username as string;
      }
      return session;
    }
  },
  session: {
    strategy: 'jwt'
  }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
