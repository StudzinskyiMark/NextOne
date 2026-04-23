import { ConvexError, v } from 'convex/values';

import { mutation, query } from './_generated/server';
import { authComponent } from './auth';

export const createPost = mutation({
  args: {
    title: v.string(),
    body: v.string(),
    imageStorageID: v.optional(v.id('_storage')),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);

    if (!user) {
      throw new ConvexError('not authenticated');
    }

    // 2. Використовуємо оператор ?? щоб перетворити null на undefined
    // Якщо imageStorageID буде undefined, поле просто не створиться в БД,
    // і твій query getPosts автоматично підхопить дефолтну картинку з siteSettings.
    const blogArticle = await ctx.db.insert('posts', {
      title: args.title,
      body: args.body,
      imageStorageID: args.imageStorageID ?? undefined,
      authorID: user._id,
    });

    return blogArticle;
  },
});

export const getPosts = query({
  args: {},
  handler: async (ctx) => {
    const posts = await ctx.db.query('posts').order('desc').collect();
    const settings = await ctx.db.query('siteSettings').first();

    const defaultId = settings?.defaultPostImageId;

    return await Promise.all(
      posts.map(async (post) => {
        const imageId = post.imageStorageID ?? defaultId;

        return {
          ...post,

          imageUrl: imageId ? await ctx.storage.getUrl(imageId) : null,
        };
      })
    );
  },
});

export const generatedImageUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) throw new ConvexError('not authenticated');
    return await ctx.storage.generateUploadUrl();
  },
});

export const getPostById = query({
  args: { postId: v.id('posts') },
  handler: async (ctx, args) => {
    const post = await ctx.db.get('posts', args.postId);

    if (!post) return null;

    const settings = await ctx.db.query('siteSettings').first();

    const imageIdToResolve = post.imageStorageID ?? settings?.defaultPostImageId;

    const resolvedImage = imageIdToResolve ? await ctx.storage.getUrl(imageIdToResolve) : null;
    return { ...post, imageUrl: resolvedImage };
  },
});
