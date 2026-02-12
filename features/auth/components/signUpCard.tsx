import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { SignUpForm } from '../forms';

// TODO add toast/sonar notifications for success and error states

// TODO add loading state to the form and disable submit button while processing

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
