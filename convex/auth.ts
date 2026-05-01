import { type GenericCtx, createClient } from '@convex-dev/better-auth';
import { convex } from '@convex-dev/better-auth/plugins';
import { betterAuth } from 'better-auth/minimal';
import { ConvexError } from 'convex/values';

import { components } from './_generated/api';
import { DataModel } from './_generated/dataModel';
import { MutationCtx, QueryCtx, query } from './_generated/server';
import authConfig from './auth.config';

const siteUrl = process.env.SITE_URL!;

// The component client has methods needed for integrating Convex with Better Auth,
// as well as helper methods for general use.
export const authComponent = createClient<DataModel>(components.betterAuth);

export const createAuth = (ctx: GenericCtx<DataModel>) => {
  return betterAuth({
    baseURL: siteUrl,
    database: authComponent.adapter(ctx),

    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
    },

    plugins: [convex({ authConfig })],
  });
};

// Example function for getting the current user
// Feel free to edit, omit, etc.
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      return null;
    }

    try {
      return await authComponent.getAuthUser(ctx);
    } catch (e) {
      return null;
    }
  },
});

export const requireUser = async (ctx: MutationCtx | QueryCtx) => {
  const authUser = await authComponent.getAuthUser(ctx);

  if (!authUser) {
    throw new ConvexError('Ви повинні бути авторизовані.');
  }

  // Повертаємо об'єкт як є, TypeScript сам виведе його поля (name, email, role тощо)
  return authUser;
};

/**
 * Тільки для адмінів
 */
// export const requireAdmin = async (ctx: MutationCtx | QueryCtx) => {
//   const user = await requireUser(ctx);

//   // TypeScript тепер "побачить" поле role, бо воно є в об'єкті authUser
//   if (user.role !== 'admin') {
//     throw new ConvexError('Ця дія доступна тільки адміністраторам.');
//   }

//   return user;
// };
