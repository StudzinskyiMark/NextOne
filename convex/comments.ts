import { paginationOptsValidator } from 'convex/server';
import { v } from 'convex/values';

import { query } from './_generated/server';

export const getCommentsByPostID = query({
  args: {
    postID: v.id('posts'),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const data = await ctx.db
      .query('comments')
      .withIndex('posts', (q) => q.eq('postID', args.postID))
      .order('desc')
      .paginate(args.paginationOpts);

    const pageWithAuthors = await Promise.all(
      data.page.map(async (comment) => {
        const author = await ctx.db.get(comment.authorID);

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

    return { ...data, page: pageWithAuthors };
  },
});

