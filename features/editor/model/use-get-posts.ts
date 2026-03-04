'use client';

import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';

export const useGetPosts = () => {
  const posts = useQuery(api.posts.getPosts);

  return {
    posts,
    isLoading: posts === undefined,
  };
};
