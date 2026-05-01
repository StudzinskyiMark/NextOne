import { Suspense } from 'react';

import { Metadata } from 'next';

import { SignInCard } from '@/features/auth';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your account',
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignInPage() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <SignInCard />
      </Suspense>
    </>
  );
}
