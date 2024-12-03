import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';

export async function GET() {
  return NextResponse.redirect(new URL('/auth/sign-up', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'));
}
