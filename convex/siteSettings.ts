import { query } from './_generated/server';

export const getSiteSettings = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('siteSettings').first();
  },
});
