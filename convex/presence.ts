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

    // 1. Якщо аутентифікований — використовуємо ID з auth контексту (для безпеки)
    if (user) {
      return await presence.heartbeat(ctx, roomId, user._id, sessionId, interval);
    }

    // 2. Якщо гість — дозволяємо з переданим userId
    return await presence.heartbeat(ctx, roomId, userId, sessionId, interval);
  },
});

export const list = query({
  args: { roomToken: v.string() },
  handler: async (ctx, { roomToken }) => {
    const entries = await presence.list(ctx, roomToken);

    return await Promise.all(
      entries.map(async (entry) => {
        // Якщо це гість — не йдемо в базу за юзером
        if (entry.userId.startsWith('Guest:')) {
          return entry;
        }

        try {
          // Тільки якщо це реальний Id юзера
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
