import { NextResponse } from 'next/server';

import { api } from '@/convex/_generated/api';
import { fetchMutation } from 'convex/nextjs';

import { getToken } from '@/lib/auth-server';

export async function POST(request: Request) {
  // Test-only route: hide it on the production deployment.
  // VERCEL_ENV (not NODE_ENV) because CI runs E2E against `pnpm start`, where NODE_ENV is 'production'.
  if (process.env.VERCEL_ENV === 'production') {
    return new NextResponse(null, { status: 404 });
  }

  // Uses its own header, not Authorization: getToken() forwards request headers to
  // Better Auth, which would treat an Authorization bearer as the session.
  const testKey = request.headers.get('x-test-api-key');

  if (!process.env.TEST_API_KEY || testKey !== process.env.TEST_API_KEY) {
    return new NextResponse('Forbidden: Invalid or missing test token', { status: 403 });
  }

  try {
    const { title } = await request.json();

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    // Forward the caller's session: the mutation only deletes the signed-in user's own post.
    const token = await getToken();
    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const result = await fetchMutation(api.posts.deletePostByTitle, { title }, { token });

    if (!result.success) {
      return NextResponse.json({ error: 'Post not found or already deleted' }, { status: 404 });
    }

    console.log(
      `[E2E CLEANUP] Post "${title}" deleted. Cascade removed comments: ${result.deletedCommentsCount}`
    );

    return NextResponse.json({
      success: true,
      message: `Cleaned up post and ${result.deletedCommentsCount} comments.`,
    });
  } catch (error) {
    console.error('Cleanup API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
