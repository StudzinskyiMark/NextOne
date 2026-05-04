'use client';

import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

export function useGuestId() {
  const guestId = useSyncExternalStore(
    subscribe,
    () => {
      if (typeof window === 'undefined') return null;

      const storedId = sessionStorage.getItem('convex_guest_id');
      if (storedId) return storedId;

      const newId = `Guest:${Math.random().toString(36).substring(2, 9)}`;
      sessionStorage.setItem('convex_guest_id', newId);

      return newId;
    },

    () => null
  );

  return guestId;
}
