import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

import { toast } from 'sonner';

import { authClient } from '@/lib/auth-client';

import { TSignInValues } from '../schemas/auth-schema';

export async function signInAction(
  data: TSignInValues,
  router?: AppRouterInstance,
  callbackUrl?: string
) {
  try {
    await authClient.signIn.email({
      email: data.email,
      password: data.password,
      fetchOptions: {
        onSuccess: () => {
          toast.success('Sign In successfully!', { position: 'top-center' });
        },
        onError: (error) => {
          toast.error(error.error.message, { position: 'top-center' });
        },
      },
    });

    if (router) {
      router.refresh();
      router.push(callbackUrl || '/');
    }

    return { success: true, message: `Sign In successful!` };
  } catch (error) {
    throw error instanceof Error ? error : new Error('An unknown error occurred');
  }
}
