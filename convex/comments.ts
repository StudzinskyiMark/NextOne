import { paginationOptsValidator } from 'convex/server';
import { ConvexError, v } from 'convex/values';

import { mutation, query } from './_generated/server';
import { authComponent } from './auth';

export const getCommentsByPostID = query({
  args: {
    postId: v.id('posts'),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const data = await ctx.db
      .query('comments')
      .withIndex('posts', (q) => q.eq('postId', args.postId))
      .order('desc')
      .paginate(args.paginationOpts);

    const page = await Promise.all(
      data.page.map(async (comment) => {
        const author = await authComponent.getAnyUserById(ctx, comment.authorID);

        return {
          ...comment,
          author: author
            ? {
                name: author.name,
                image: author.image,
              }
            : null,
        };
      })
    );

    return { ...data, page };
  },
});

export const createComment = mutation({
  args: {
    postId: v.id('posts'),
    body: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);

    if (!user) {
      throw new ConvexError('You must be signed in to comment!');
    }

    return await ctx.db.insert('comments', {
      postId: args.postId,
      authorID: user._id,
      body: args.body,
    });
  },
});
