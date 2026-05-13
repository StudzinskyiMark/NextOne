// features/search-posts/model/use-search.ts
import { useEffect, useState } from 'react';

import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';

export function useSearch(limit = 5) {
  const [term, setTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');

  // Дебаунс, щоб не спамити Convex на кожен клік клавіші
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(term);
    }, 300);

    return () => clearTimeout(handler);
  }, [term]);

  // Викликаємо query тільки якщо є текст для пошуку
  const results = useQuery(
    api.posts.postSearch,
    debouncedTerm.trim().length > 0 ? { term: debouncedTerm, limit } : 'skip'
  );

  return {
    term,
    setTerm,
    results: results ?? [],
    isLoading: results === undefined && debouncedTerm.length > 0,
  };
}
