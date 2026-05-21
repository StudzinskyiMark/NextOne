import { RefObject, useEffect } from 'react';

// Виносимо тип для подій, які підтримує браузер
type EventNames = 'mousedown' | 'mouseup' | 'click' | 'touchstart' | 'touchend';

export function useClickAway(
  ref: RefObject<Element | null>, // Змінили HTMLElement на більш універсальний Element
  onClickAway: (event: Event) => void, // Передаємо подію в колбек, щоб знати, що саме викликало клік
  eventName: EventNames = 'mousedown' // Додали динамічну подію з дефолтним значенням
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      // Перевіряємо, чи елемент існує і чи клік відбувся ПОЗА ним
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
