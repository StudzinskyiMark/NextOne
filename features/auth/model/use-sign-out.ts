import { useTransition } from 'react';

import { useRouter } from 'next/navigation';

import { toast } from 'sonner';

import { authClient } from '@/lib/auth-client';

export const useSignOut = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSignOut = () => {
    startTransition(async () => {
      try {
        await authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              toast.success('You are signed out!', { position: 'top-center' });
            //   router.push('/');
              router.refresh();
            },
            onError: (ctx) => {
              toast.error(ctx.error.message || 'Error signing out', { position: 'top-center' });
            },
          },
        });
      } catch (error) {
        toast.error('Critical error!');
        console.error(error);
      }
    });
  };

  return { isPending, handleSignOut };
};
