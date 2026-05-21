import { renderHook } from '@testing-library/react';

import { useClickAway } from './use-click-away';

describe('useClickAway', () => {
  test('should call onClickAway when clicked outside', () => {
    // 1. Arrange (Налаштування середовища)
    const cb = vi.fn(); // Create a mock function
    const targetEl = document.createElement('div'); //  Element, that will be clicked
    const outsideEl = document.createElement('div'); // Element, that will be outside

    // Adding elements to the DOM
    document.body.appendChild(targetEl);
    document.body.appendChild(outsideEl);

    // Creating a ref hook
    const ref = { current: targetEl };

    // 2. Act (Виконання дії)
    renderHook(() => useClickAway(ref, cb)); // Run the hook
    outsideEl.dispatchEvent(new MouseEvent('mousedown', { bubbles: true })); // Simulate a click on the outside element to simulate a real mouse click

    // 3. Assert (Перевірка результату)
    expect(cb).toHaveBeenCalled(); // Check if the mock function was called
  });
});
