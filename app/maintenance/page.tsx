import { Hammer } from 'lucide-react';

export default function MaintenancePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <div className="bg-card mb-6 flex h-20 w-20 items-center justify-center rounded-full border shadow-xl">
        <Hammer className="h-10 w-10 animate-pulse" />
      </div>
      <h1 className="mb-4 bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-5xl">
        {` We'll be back soon!`}
      </h1>
      <p className="max-w-md text-lg">
        {`We're currently undergoing scheduled maintenance to improve your experience. Please check
        back in a few minutes.`}
      </p>
    </div>
  );
}
