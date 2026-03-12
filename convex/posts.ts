import { ConvexError, v } from 'convex/values';

import { mutation, query } from './_generated/server';
import { authComponent } from './auth';

export const createPost = mutation({
  args: { title: v.string(), body: v.string(), imageStorageID: v.optional(v.id('_storage')) },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);

    if (!user) {
      throw new ConvexError('not authenticated');
    }

    const blogArticle = await ctx.db.insert('posts', {
      title: args.title,
      body: args.body,
      imageStorageID: args.imageStorageID,
      authorID: user._id,
    });
    return blogArticle;
  },
});

export const getPosts = query({
  args: {},
  handler: async (ctx) => {
    const posts = await ctx.db.query('posts').order('desc').collect();

    return await Promise.all(
      posts.map(async (post) => {
        const resolvedImage =
          post.imageStorageID !== undefined ? await ctx.storage.getUrl(post.imageStorageID) : null;

        return { ...post, imageUrl: resolvedImage };
      })
    );
  },
});

export const generatedImageUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    const user = await authComponent.safeGetAuthUser(ctx);

    if (!user) {
      throw new ConvexError('not authenticated');
    }

    return await ctx.storage.generateUploadUrl();
  },
});
