import { useTransition } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { toast } from 'sonner';

import { authClient } from '@/lib/auth-client';

import { TSignUpValues } from '../schemas/auth.schema';

export function useSignUp() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const callbackUrl = searchParams.get('callbackUrl');

  const signUp = (data: TSignUpValues) => {
    return new Promise<void>((resolve, reject) => {
      startTransition(async () => {
        try {
          await authClient.signUp.email({
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            password: data.password,
            username: data.username,
            displayUsername: data.username,
            callbackURL: callbackUrl || '/',
            fetchOptions: {
              onSuccess: () => {
                toast.success('Sign Up successfully!', { position: 'top-center' });
                router.refresh();
                resolve();
              },
              onError: (ctx) => {
                toast.error(ctx.error.message, { position: 'top-center' });
                reject(new Error(ctx.error.message));
              },
            },
          });
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'An unexpected error occurred';
          toast.error(errorMessage, { position: 'top-center' });
          reject(error instanceof Error ? error : new Error(errorMessage));
        }
      });
    });
  };

  return { isSigningUp: isPending, signUp };
}
