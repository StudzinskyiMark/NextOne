'use client';

import { CommandDialog, CommandInput, CommandList } from '@/components/ui/command';

import { useSearch } from '../model/use-search';
import { SearchResults } from './search-results';

// TODO: Improve SearchModal UI/UX on mobile
// The current SearchModal UI/UX is not optimized for mobile devices. This task involves making the modal more user-friendly and intuitive on mobile devices. This can include adjusting the layout, making the input field and buttons more touch-friendly, and optimizing the scrolling behavior. It's also important to ensure that the modal is responsive and adapts well to different screen sizes.

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const { term, setTerm, results, isLoading } = useSearch(5);

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose} shouldFilter={false}>
      <CommandInput value={term} onValueChange={setTerm} placeholder="Type to search articles..." />
      <CommandList className="max-h-75">
        <SearchResults results={results} isLoading={isLoading} term={term} onItemClick={onClose} />
      </CommandList>
    </CommandDialog>
  );
}
