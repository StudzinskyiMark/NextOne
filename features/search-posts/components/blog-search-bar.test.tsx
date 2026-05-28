import { Id } from '@/convex/_generated/dataModel';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';
import { vi } from 'vitest';

import { useSearch } from '@/features/search-posts/model/use-search';

import { BlogSearchBar } from './blog-search-bar';

vi.mock('@/features/search-posts/model/use-search', () => ({
  useSearch: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('BlogSearchBar', () => {
  test('should update input value when user types', async () => {
    const setTermMock = vi.fn();

    vi.mocked(useSearch).mockReturnValue({
      term: '',
      setTerm: setTermMock,
      results: [],
      isLoading: false,
    });

    render(<BlogSearchBar />);

    const searchForm = screen.getByRole('search');
    const input = within(searchForm).getByRole('searchbox');

    await userEvent.type(input, 'test');

    expect(setTermMock).toHaveBeenNthCalledWith(1, 't');
    expect(setTermMock).toHaveBeenNthCalledWith(2, 'e');
    expect(setTermMock).toHaveBeenNthCalledWith(3, 's');
    expect(setTermMock).toHaveBeenNthCalledWith(4, 't');
  });

  test('should show results list when user types a search term', async () => {
    vi.mocked(useSearch).mockReturnValue({
      term: 'test',
      setTerm: vi.fn(),
      results: [
        {
          _id: 'post-1' as Id<'posts'>,
          title: 'Testing Guide',
          body: 'Test post for testing',
        },
      ],
      isLoading: false,
    });

    render(<BlogSearchBar />);

    const searchForm = screen.getByRole('search');
    const input = within(searchForm).getByRole('searchbox');

    await userEvent.click(input);

    const resultItem = await screen.findByText('Testing Guide');

    expect(resultItem).toBeInTheDocument();
  });
});
