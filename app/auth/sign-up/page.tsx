import { Suspense } from 'react';

import { Metadata } from 'next';

import { SignUpCard } from '@/features/auth';

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Create a new account',
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignUpPage() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <SignUpCard />
      </Suspense>
    </>
  );
}
