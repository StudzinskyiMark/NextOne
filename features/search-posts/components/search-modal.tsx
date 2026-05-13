'use client';

import Link from 'next/link';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

import { useSearch } from '../model/use-search';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const { term, setTerm, results, isLoading } = useSearch(5);

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandInput
        value={term}
        onValueChange={setTerm}
        placeholder="Type a command or search..."
      />
      <CommandList>
        {term.trim().length > 0 && results.length === 0 && !isLoading && (
          <CommandEmpty>No results found.</CommandEmpty>
        )}
        <CommandGroup heading="Articles">
          {results.map((post) => (
            <CommandItem key={post._id} value={post._id} onSelect={onClose} asChild>
              <Link href={`/blog/${post._id}`}>{post.title}</Link>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
