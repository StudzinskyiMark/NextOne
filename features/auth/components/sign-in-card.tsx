'use client';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { SignInForm } from '../forms/sign-in-form';

export function SignInCard() {
  return (
    <Card className="mx-auto w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="text-center text-xl">Sign In</CardTitle>
        <CardDescription className="text-center">Enter in your account</CardDescription>
        <Separator className="my-2" />
        <SignInForm />
      </CardHeader>
    </Card>
  );
}
