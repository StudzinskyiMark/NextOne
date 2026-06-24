'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Loader2 } from 'lucide-react';

import { cn } from '@/lib/utils';

import { CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command';

import { TSearchResultElement } from '../model/types';

interface SearchResultsProps {
  results: TSearchResultElement[];
  isLoading: boolean;
  term: string;
  onItemClick?: () => void;
}

export function SearchResults({ results, isLoading, term, onItemClick }: SearchResultsProps) {
  const router = useRouter();

  if (term.trim() === '') {
    return (
      <p className="text-muted-foreground p-4 text-center text-sm">
        Start typing to find articles...
      </p>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center p-6">
        <Loader2 className="m-0 aspect-square size-6 shrink-0 animate-spin p-0 text-emerald-500" />
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <CommandEmpty className="text-muted-foreground py-6 text-center text-sm">
        No results found for {term}
      </CommandEmpty>
    );
  }

  return (
    <CommandGroup>
      <div className="flex flex-col gap-2 py-2">
        {results.map((post) => (
          <CommandItem
            key={post._id}
            value={post._id}
            onSelect={() => {
              if (onItemClick) onItemClick();
              router.push(`/blog/${post._id}`);
            }}
            className="group data-[selected=true]:bg-muted aria-selected:bg-muted flex cursor-pointer flex-col items-start rounded-lg p-2 transition-colors"
            asChild
          >
            <Link href={`/blog/${post._id}`} className="group flex w-full flex-col">
              <span
                className={cn(
                  'text-foreground text-sm font-medium transition-colors',

                  'group-hover:text-emerald-600',

                  'group-data-[selected=true]:text-emerald-600'
                )}
              >
                {post.title}
              </span>
              <span className="text-muted-foreground mt-0.5 line-clamp-1 text-xs">
                {post.plainText}
              </span>
            </Link>
          </CommandItem>
        ))}
      </div>
    </CommandGroup>
  );
}
