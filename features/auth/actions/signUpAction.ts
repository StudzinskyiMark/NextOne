'use server';
import { TSignUpValues } from '../schemas';

export const handleSignUpSubmit = async (data: TSignUpValues) => {
  try {
    //  const response = await fetch('/api/auth/signup', {
    //    method: 'POST',
    //    headers: { 'Content-Type': 'application/json' },
    //    body: JSON.stringify(data),
    //  });

    //  const result = await response.json();

    //  if (!response.ok) {
    //    throw new Error(result.message || 'Failed to sign up');
    //  }

    //  return result;
    console.log('Sign up data:', data);
    return { success: true, message: `Sign up successful! Welcome, ${data.name}` };
  } catch (error) {
    throw error instanceof Error ? error : new Error('An unknown error occurred');
  }
};
