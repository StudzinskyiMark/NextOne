// hooks/use-sign-in.ts
import { useTransition } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { toast } from 'sonner';

import { authClient } from '@/lib/auth-client';

import { TSignInValues } from '../schemas/auth.schema';

type SignInArgs =
  | { provider: 'google' | 'github' }
  | { email: TSignInValues['email']; password: TSignInValues['password'] };

export function useSignIn() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const callbackUrl = searchParams.get('callbackUrl');

  const signIn = (data: SignInArgs) => {
    // Повертаємо чесний Promise користувачу хука 🤝
    return new Promise<void>((resolve, reject) => {
      startTransition(async () => {
        try {
          if ('provider' in data) {
            await authClient.signIn.social({
              provider: data.provider,
              callbackURL: callbackUrl || '/',
              fetchOptions: {
                onSuccess: () => {
                  toast.success('Sign In successfully!', { position: 'top-center' });
                  router.push(callbackUrl || '/');
                  router.refresh();
                  resolve(); // <-- Сигналізуємо компоненту про успіх
                },
                onError: (ctx) => {
                  toast.error(ctx.error.message, { position: 'top-center' });
                  reject(new Error(ctx.error.message)); // <-- Прокидаємо помилку в компонент
                },
              },
            });
          } else if ('email' in data && 'password' in data) {
            await authClient.signIn.email({
              email: data.email,
              password: data.password,
              fetchOptions: {
                onSuccess: () => {
                  toast.success('Sign In successfully!', { position: 'top-center' });
                  router.push(callbackUrl || '/');
                  router.refresh();
                  resolve(); // <-- Сигналізуємо компоненту про успіх
                },
                onError: (ctx) => {
                  toast.error(ctx.error.message, { position: 'top-center' });
                  reject(new Error(ctx.error.message)); // <-- Прокидаємо помилку в компонент
                },
              },
            });
          }
        } catch (error) {
          // Обробка мережевих помилок (якщо сам fetch впав)
          const errorMessage =
            error instanceof Error ? error.message : 'An unexpected error occurred';
          toast.error(errorMessage, { position: 'top-center' });
          reject(error instanceof Error ? error : new Error(errorMessage));
        }
      });
    });
  };

  return { isSigningIn: isPending, signIn };
}
