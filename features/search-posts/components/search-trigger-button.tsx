'use client';

import { useSyncExternalStore } from 'react';

import { Search } from 'lucide-react';

import { Button } from '@/components/ui/button';

const subscribe = () => () => {};

const getSnapshot = () => {
  if (typeof window === 'undefined') return true;
  return /Mac|iPhone|iPod|iPad/i.test(navigator.userAgent);
};

const getServerSnapshot = () => true;

interface SearchTriggerButtonProps {
  onClick: () => void;
}

export function SearchTriggerButton({ onClick }: SearchTriggerButtonProps) {
  const isMac = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <Button
      variant="outline"
      onClick={onClick}
      className="text-muted-foreground hover:text-foreground relative h-9 w-9 p-0 transition-colors md:w-auto md:px-3 md:py-2"
      aria-label="Open global search"
    >
      <Search className="size-5 md:mr-2 md:size-4" />

      <span className="hidden md:inline">Search</span>

      <kbd className="bg-muted/50 border-border text-muted-foreground pointer-events-none hidden h-5 items-center gap-0.5 rounded border px-1.5 font-mono text-[10px] font-medium transition-colors select-none md:inline-flex">
        {isMac ? (
          <>
            <span className="text-xs">⌘</span>
            <span className="text-[9px]">+</span>
            <span>K</span>
          </>
        ) : (
          <>
            <span>Ctrl</span>
            <span className="text-[9px]">+</span>
            <span>K</span>
          </>
        )}
      </kbd>
    </Button>
  );
}
