import { ArrowLeft } from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingPostIdPage() {
  return (
    <div className="relative mx-auto max-w-4xl animate-pulse p-2 duration-300 sm:p-4">
      <div
        className={buttonVariants({
          variant: 'ghost',
          className: 'text-muted-foreground pointer-events-none mb-8 ml-8 opacity-50',
        })}
      >
        <ArrowLeft className="mr-2 size-4" /> Go back
      </div>

      <Card className="mb-8 overflow-hidden pt-0 shadow-2xl shadow-emerald-600/20 backdrop-blur-sm dark:shadow-emerald-600/40">
        <div className="relative h-64 w-full sm:h-80">
          <Skeleton className="h-full w-full rounded-none" />
          <div
            className="absolute inset-0 z-10"
            style={{
              background: 'linear-gradient(to bottom, transparent 10%, hsl(var(--card)) 100%)',
            }}
          />
        </div>

        <CardHeader>
          <div className="relative z-20 -mt-8 mb-4 flex items-center justify-between gap-2">
            <Skeleton className="h-4 w-24" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-20" />

              <div className="flex -space-x-2">
                <Skeleton className="border-background h-8 w-8 rounded-full" />
                <Skeleton className="border-background h-8 w-8 rounded-full" />
                <Skeleton className="border-background h-8 w-8 rounded-full" />
                <Skeleton className="border-background h-8 w-8 rounded-full" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Skeleton className="h-10 w-3/4 sm:h-12" />
            <Skeleton className="h-10 w-1/2 sm:h-12" />
          </div>

          <Separator className="my-2" />
        </CardHeader>

        <CardContent className="space-y-4 px-10">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-[96%]" />
          <Skeleton className="h-5 w-[98%]" />
          <Skeleton className="h-5 w-[92%]" />
          <Skeleton className="h-5 w-2/3" />
        </CardContent>

        <CardContent>
          <div className="space-y-4 border-t pt-4">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-24 w-full rounded-md" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
