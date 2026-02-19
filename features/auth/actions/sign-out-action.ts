import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

import { toast } from 'sonner';

import { authClient } from '@/lib/auth-client';

export async function signOutAction(router?: AppRouterInstance) {
  try {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success('Sign Out successfully!', { position: 'top-center' });
        },
        onError: (error) => {
          toast.error(error.error.message, { position: 'top-center' });
        },
      },
    });

    if (router) {
      router.refresh();
      router.push('/');
    }
  } catch (error) {
    console.error(error);
  }
}
