import { NextResponse } from 'next/server';

import { api } from '@/convex/_generated/api';
import { fetchMutation } from 'convex/nextjs';

export async function POST(request: Request) {
  const authHeader = request.headers.get('Authorization');
  const expectedToken = `Bearer ${process.env.TEST_API_KEY}`;

  if (!process.env.TEST_API_KEY || authHeader !== expectedToken) {
    return new NextResponse('Forbidden: Invalid or missing test token', { status: 403 });
  }

  try {
    const { title } = await request.json();

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const result = await fetchMutation(api.posts.deletePostByTitle, { title });

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
