import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

// TODO Upgrade auth to support Social Login (Google/GitHub) with account linking.
// Add Admin/User roles and enforce security checks in all server-side functions.

export default defineSchema({
  posts: defineTable({
    title: v.string(),
    body: v.string(),
    imageStorageID: v.optional(v.id('_storage')),
    authorID: v.id('users'),
  }),

  users: defineTable({
    name: v.string(),
    email: v.string(),
    emailVerified: v.boolean(),
    role: v.optional(v.union(v.literal('admin'), v.literal('user'))),
    image: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index('by_email', ['email']),

  accounts: defineTable({
    userId: v.id('users'),
    accountId: v.string(), // ID користувача в Google/GitHub
    providerId: v.string(), // "google", "github", "credential"
    accessToken: v.optional(v.string()),
    refreshToken: v.optional(v.string()),
    idToken: v.optional(v.string()),
    expiresAt: v.optional(v.number()),
    password: v.optional(v.string()), // Тут зберігатиметься хеш пароля для email+pass
  }),

  sessions: defineTable({
    userId: v.id('users'),
    token: v.string(),
    expiresAt: v.number(),
    ipAddress: v.optional(v.string()),
    userAgent: v.optional(v.string()),
  }).index('by_token', ['token']),

  comments: defineTable({
    postID: v.id('posts'),
    authorID: v.id('users'),
    body: v.string(),
  }).index('posts', ['postID']),

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
