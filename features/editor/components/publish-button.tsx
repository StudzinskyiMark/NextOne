import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';

export function PublishButton() {
  return (
    <>
      <Link className={buttonVariants({ variant: 'secondary' })} href="/publish">
        Publish
      </Link>
    </>
  );
}
