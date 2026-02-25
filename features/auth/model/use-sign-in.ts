// hooks/use-sign-in.ts
import { useTransition } from 'react';

import { useRouter } from 'next/navigation';

import { toast } from 'sonner';

import { authClient } from '@/lib/auth-client';

import { TSignInValues } from '../schemas/auth.schema';

export function useSignIn() {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const { searchParams } = new URL(window.location.href);
  const callbackUrl = searchParams.get('callbackUrl');

  const signIn = async (data: TSignInValues) => {
    startTransition(async () => {
      try {
        await authClient.signIn.email({
          email: data.email,
          password: data.password,
          callbackURL: callbackUrl || '/',
          fetchOptions: {
            onSuccess: () => {
              toast.success('Sign In successfully!', { position: 'top-center' });
              router.refresh();
            },
            onError: (ctx) => {
              toast.error(ctx.error.message, { position: 'top-center' });
            },
          },
        });
      } catch (error) {
        toast.error('An unexpected error occurred');
        throw error instanceof Error ? error : new Error('An unknown error occurred');
      }
    });
  };

  return { isSigningIn: isPending, signIn };
}
