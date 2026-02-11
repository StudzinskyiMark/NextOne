import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { SignUpForm } from '../forms';

export function SignUpCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create a new account</CardDescription>
        <Separator className="my-2" />
        <SignUpForm />
      </CardHeader>
    </Card>
  );
}
