'use client';

import { useEffect, useState } from 'react';

import { SearchModal } from './search-modal';
import { SearchTriggerButton } from './search-trigger-button';

export function SearchHeaderWrapper() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const isSearchKey = e.code === 'KeyK';
      const isModifierPressed = e.metaKey || e.ctrlKey;

      if (isSearchKey && isModifierPressed) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      <SearchTriggerButton onClick={() => setIsOpen(true)} />
      <SearchModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
