import { ConvexError, v } from 'convex/values';

import { internalMutation } from './_generated/server';
import { requireUser } from './auth';

export const trackAndLimit = internalMutation({
  args: { today: v.string() },
  handler: async (ctx, args) => {
    const user = await requireUser(ctx);
    const userId = user._id;

    const log = await ctx.db
      .query('aiDailyLogs')
      .withIndex('by_user_and_date', (q) => q.eq('userId', userId).eq('date', args.today))
      .unique();

    if (!log) {
      await ctx.db.insert('aiDailyLogs', {
        userId,
        date: args.today,
        count: 1,
      });
    } else {
      if (log.count >= 10) {
        throw new ConvexError('Daily AI generation limit (10) reached. Please try again tomorrow!');
      }
      await ctx.db.patch(log._id, {
        count: log.count + 1,
      });
    }
  },
});
