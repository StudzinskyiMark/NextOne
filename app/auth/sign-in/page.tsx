'use client';

import { Suspense } from 'react';

import { SignInCard } from '@/features/auth';

export default function SignInPage() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <SignInCard />
      </Suspense>
    </>
  );
}
