import { query } from './_generated/server';

export const getSiteSettings = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('siteSettings').first();
  },
});

export const getAnnouncement = query({
  args: {},
  handler: async (ctx) => {
    const settings = await ctx.db.query('siteSettings').first();

    return settings?.announcement || { enabled: false, text: '' };
  },
});
