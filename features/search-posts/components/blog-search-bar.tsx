'use client';

import { useRef, useState } from 'react';

import { Loader2, Search } from 'lucide-react';

import { Command, CommandList } from '@/components/ui/command';
import { Input } from '@/components/ui/input';

import { useClickAway } from '../model/use-click-away';
import { useSearch } from '../model/use-search';
import { SearchResults } from './search-results';

export function BlogSearchBar() {
  const { term, setTerm, results, isLoading } = useSearch(5);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useClickAway(containerRef, () => setIsOpen(false));

  const showResults = isOpen && term.trim().length > 0;

  return (
    <div ref={containerRef} className="relative mx-auto w-full max-w-2xl">
      <Command shouldFilter={false} className="overflow-visible bg-transparent">
        <div className="relative flex w-full items-center">
          <Search className="text-muted-foreground absolute left-4 z-10 size-5" />
          <Input
            type="search"
            value={term}
            onChange={(e) => {
              setTerm(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder="Search articles by title or content..."
            className="bg-card/50 w-full rounded-xl border pr-4 pl-12 text-base backdrop-blur-sm md:h-12"
          />
          {isLoading && (
            <Loader2 className="text-muted-foreground absolute right-4 z-10 size-4 animate-spin" />
          )}
        </div>

        {showResults && (
          <div className="border-border bg-background/95 absolute top-full left-0 z-50 mt-2 w-full rounded-xl border p-2 shadow-2xl backdrop-blur-md">
            <CommandList className="max-h-75">
              <SearchResults
                results={results}
                isLoading={isLoading}
                term={term}
                onItemClick={() => setIsOpen(false)}
              />
            </CommandList>
          </div>
        )}
      </Command>
    </div>
  );
}
