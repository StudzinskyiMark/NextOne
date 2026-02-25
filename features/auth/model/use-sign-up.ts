// hooks/use-sign-in.ts
import { useTransition } from 'react';

import { useRouter } from 'next/navigation';

import { toast } from 'sonner';

import { authClient } from '@/lib/auth-client';

import { TSignUpValues } from '../schemas/auth.schema';

export function useSignUp() {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const { searchParams } = new URL(window.location.href);
  const callbackUrl = searchParams.get('callbackUrl');

  const signUp = async (data: TSignUpValues) => {
    startTransition(async () => {
      try {
        await authClient.signUp.email({
          name: data.name,
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

  return { isSigningUp: isPending, signUp };
}
