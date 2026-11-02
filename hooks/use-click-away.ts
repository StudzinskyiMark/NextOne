import { RefObject, useEffect } from 'react';

// Browser events the hook can listen to
type EventNames = 'mousedown' | 'mouseup' | 'click' | 'touchstart' | 'touchend';

export function useClickAway(
  ref: RefObject<Element | null>, // Element (not HTMLElement) so SVG elements work too
  onClickAway: (event: Event) => void, // Receives the event that triggered the click-away
  eventName: EventNames = 'mousedown' // Event to listen for (defaults to mousedown)
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      // Fire only if the element exists and the click happened outside it
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickAway(event);
      }
    }

    document.addEventListener(eventName, handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener(eventName, handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [ref, onClickAway, eventName]);
}
