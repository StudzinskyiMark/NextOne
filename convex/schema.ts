import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

// TODO Upgrade auth to support Social Login (Google/GitHub) with account linking.
// Add Admin/User roles and enforce security checks in all server-side functions and add 0Auth with account linking and a table that stores user roles and enforce security checks in all server-side functions.

export default defineSchema({
  posts: defineTable({
    title: v.string(),
    body: v.string(),
    imageStorageID: v.optional(v.id('_storage')),
    authorID: v.string(),
  })
    .searchIndex('search_title', { searchField: 'title' })
    .searchIndex('search_body', { searchField: 'body' }),

  comments: defineTable({
    postId: v.id('posts'),
    authorID: v.string(),
    body: v.string(),
  }).index('posts', ['postId']),

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
