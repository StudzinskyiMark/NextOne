import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

import { SearchTriggerButton } from './search-trigger-button';

describe('SearchTriggerButton', () => {
  test('should call onClick when button is clicked', async () => {
    const mockOnClick = vi.fn();

    render(<SearchTriggerButton onClick={mockOnClick} />);

    const button = screen.getByRole('button', { name: /open global search/i });
    const user = userEvent.setup();

    await user.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('should render Ctrl+K for Windows users', async () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value: 'Windows',
      configurable: true,
    });

    render(<SearchTriggerButton onClick={vi.fn()} />);

    expect(screen.getByText('Ctrl')).toBeDefined();
  });

  test('should render ⌘+K for Mac users', async () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value: 'Mac',
      configurable: true,
    });

    render(<SearchTriggerButton onClick={vi.fn()} />);

    expect(screen.getByText('⌘')).toBeDefined();
  });
});
