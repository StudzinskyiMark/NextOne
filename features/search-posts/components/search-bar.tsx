'use client';

import { useRef, useState } from 'react';

import { useClickAway } from '@/hooks';
import { Search } from 'lucide-react';

import { Command, CommandList } from '@/components/ui/command';
import { Input } from '@/components/ui/input';

import { useSearch } from '../model/use-search';
import { SearchResults } from './search-results';

// IDEA Implement a separate search results page using URL query parameters
// 1. Create a dedicated page route (e.g., /blog/search) to display full search results.
// 2. Extract the search term from the URL query string (e.g., ?q=term) on the new page.
// 3. Pass the extracted term to useSearch and render the SearchResults component.

export function SearchBar() {
  const { term, setTerm, results, isLoading } = useSearch(5);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setIsOpen(false);
    setTerm('');
  };

  useClickAway(containerRef, handleClose);

  const showResults = isOpen && term.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div ref={containerRef} className="relative mx-auto w-full max-w-2xl">
      <form role="search" onSubmit={handleSubmit}>
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
              className="bg-card w-full rounded-xl border pr-4 pl-12 text-base backdrop-blur-sm md:h-12"
            />

            {showResults && (
              <div className="border-border bg-sidebar absolute top-full left-0 z-50 mt-2 w-full rounded-xl border p-2 shadow-2xl backdrop-blur-md">
                <CommandList className="max-h-75" aria-label="Search Results">
                  <SearchResults
                    results={results}
                    isLoading={isLoading}
                    term={term}
                    onItemClick={handleClose}
                  />
                </CommandList>
              </div>
            )}
          </div>
        </Command>
      </form>
    </div>
  );
}
