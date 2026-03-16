'use client';

import { Suspense } from 'react';

import { SignUpCard } from '@/features/auth';

export default function SignUpPage() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <SignUpCard />
      </Suspense>
    </>
  );
}
