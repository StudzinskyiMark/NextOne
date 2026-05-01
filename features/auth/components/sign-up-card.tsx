'use client';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { SignUpForm } from '../forms/sign-up-form';

export function SignUpCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-xl">Sign Up</CardTitle>
        <CardDescription className="text-center">Create a new account</CardDescription>
        <Separator className="my-2" />
        <SignUpForm />
      </CardHeader>
    </Card>
  );
}
