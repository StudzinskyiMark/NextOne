import { Presence } from '@convex-dev/presence';
import { ConvexError, v } from 'convex/values';

import { components } from './_generated/api';
import { mutation, query } from './_generated/server';
import { authComponent } from './auth';

export const presence = new Presence(components.presence);

export const heartbeat = mutation({
  args: {
    roomId: v.string(),
    userId: v.string(),
    sessionId: v.string(),
    interval: v.number(),
  },
  handler: async (ctx, { roomId, userId, sessionId, interval }) => {
    const user = await authComponent.safeGetAuthUser(ctx);

    // 1. Signed in: use the ID from the auth context (can't be spoofed)
    if (user) {
      return await presence.heartbeat(ctx, roomId, user._id, sessionId, interval);
    }

    // 2. Guest: accept the userId passed by the client
    return await presence.heartbeat(ctx, roomId, userId, sessionId, interval);
  },
});

export const list = query({
  args: { roomToken: v.string() },
  handler: async (ctx, { roomToken }) => {
    const entries = await presence.list(ctx, roomToken);

    return await Promise.all(
      entries.map(async (entry) => {
        // Guests have no user record to look up
        if (entry.userId.startsWith('Guest:')) {
          return entry;
        }

        try {
          // Only for real user IDs
          const user = await authComponent.getAnyUserById(ctx, entry.userId);
          if (!user) return entry;

          return {
            ...entry,
            name: user.name,
            image: user.image ?? undefined,
          };
        } catch (error) {
          return entry;
        }
      })
    );
  },
});

export const disconnect = mutation({
  args: { sessionToken: v.string() },
  handler: async (ctx, { sessionToken }) => {
    // Can't check auth here because it's called over http from sendBeacon.
    return await presence.disconnect(ctx, sessionToken);
  },
});

export const getUserId = query({
  args: {},
  handler: async (ctx) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    return user?._id;
  },
});
