import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  const username = params.username;
  return new Response(JSON.stringify({ username }), {
    headers: { 'content-type': 'application/json' },
  });
}
