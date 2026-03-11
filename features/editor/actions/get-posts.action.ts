'use server';

import { api } from '@/convex/_generated/api';
import { fetchQuery } from 'convex/nextjs';

export async function getPostsAction() {
  const posts = await fetchQuery(api.posts.getPosts);

  return posts;
}
