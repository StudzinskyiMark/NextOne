import { Metadata } from 'next';

import { PublishCard } from '@/features/editor';

export const metadata: Metadata = {
  title: 'Publish',
  description: 'Share your findings, tools, or development updates',
};

export default function PublishPage() {
  return (
    <div className="py-4">
      <div className="pb-6 text-center">
        <h1 className="text-2xl font-bold tracking-wide">Create New Publication</h1>
        <p className="text-m text-muted-foreground py-2 font-semibold">
          Share your findings, tools, or development updates
        </p>
      </div>
      <PublishCard />
    </div>
  );
}
