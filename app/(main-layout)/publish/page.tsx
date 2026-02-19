import { PublishCard } from '@/features/editor';

export default function PublishPage() {
  return (
    <div className="py-4">
      <div className="pb-6 text-center">
        <h1 className="text-2xl font-bold tracking-wide">Create New Publication</h1>
        <p className="text-m py-2 font-semibold text-muted-foreground">
          Share your findings, tools, or development updates
        </p>
      </div>
      <PublishCard />
    </div>
  );
}
