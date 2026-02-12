import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { SignUpForm } from '../forms';

// TODO add toast/sonar notifications
//add toast/sonar for success and/or error states for Sign Up to provide feedback to the user on the status of their sign up attempt.

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
