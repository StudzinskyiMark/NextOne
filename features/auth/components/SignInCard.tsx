import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { SignInForm } from '../forms/signInForm';

export function SignInCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-xl">Sign In</CardTitle>
        <CardDescription className="text-center">Enter in your account</CardDescription>
        <Separator className="my-2" />
        <SignInForm />
      </CardHeader>
    </Card>
  );
}
