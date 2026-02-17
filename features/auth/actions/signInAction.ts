import { redirect } from 'next/navigation';

import { authClient } from '@/lib/auth-client';

import { TSignInValues } from '../schemas/authSchema';

export async function signInAction(data: TSignInValues) {
  try {
    const result = await authClient.signIn.email({
      email: data.email,
      password: data.password,
    });
    if (result) {
      redirect('/');
    }
    return { success: true, message: `Sign up successful!` };
  } catch (error) {
    throw error instanceof Error ? error : new Error('An unknown error occurred');
  }
}
