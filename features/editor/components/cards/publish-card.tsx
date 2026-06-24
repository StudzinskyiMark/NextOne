import { Card, CardContent } from '@/components/ui/card';

import { PublishForm } from '../../forms/publish-form';

export function PublishCard() {
  return (
    <>
      <Card className="mx-auto w-full max-w-4xl">
        <CardContent className="md:p-6 p-4">
          <PublishForm />
        </CardContent>
      </Card>
    </>
  );
}
