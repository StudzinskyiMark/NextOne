import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

import { toast } from 'sonner';

import { authClient } from '@/lib/auth-client';

import { TSignUpValues } from '../schemas/auth-schema';

// REFACTOR Refactor to server action signUpAction
//This server action is used to sign up a user. Create hook for toasts and redirect for form

export const signUpSubmit = async (data: TSignUpValues, router: AppRouterInstance) => {
  try {
    await authClient.signUp.email({
      name: data.name,
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
      router.push('/');
    }

    return { success: true, message: `Sign up successful!` };
  } catch (error) {
    throw error instanceof Error ? error : new Error('An unknown error occurred');
  }
};
