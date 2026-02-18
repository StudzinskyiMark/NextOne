import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { SignInForm } from '../forms/signInForm';

// TODO add toast/sonar notifications Sign In
//add toast/sonar for success and/or error states for Sign Up to provide feedback to the user on the status of their sign up attempt.

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
