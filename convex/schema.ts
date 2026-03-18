import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  posts: defineTable({
    title: v.string(),
    body: v.string(),
    imageStorageID: v.optional(v.id('_storage')),
    authorID: v.string(),
  }),

  // This table is used to store the settings for the site
  siteSettings: defineTable({
    siteName: v.string(), // The name of the site
    siteDescription: v.string(), // The description of the site
    defaultPostImageId: v.id('_storage'), // The ID of the default image for posts
    isMaintenanceMode: v.boolean(), // Whether the site is in maintenance mode
    postsPerPage: v.float64(), // The number of posts to display per page
    announcement: v.object({
      // The announcement
      text: v.string(), // The text of the announcement
      enabled: v.boolean(), // Whether the announcement is enabled
    }),
  }),
});
