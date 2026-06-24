import { act, renderHook, waitFor } from '@testing-library/react';
import { toast } from 'sonner';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useGenerateTitles } from './use-generate-titles';

const mockAction = vi.fn();
vi.mock('convex/react', () => ({
  useAction: () => mockAction,
}));

vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
  },
}));

describe('useGenerateTitles', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useGenerateTitles());

    expect(result.current.isGenerating).toBe(false);
    expect(result.current.suggestions).toEqual([]);
  });

  it('should generate notification (toast) and not call API if content is too short', () => {
    const { result } = renderHook(() => useGenerateTitles());

    act(() => {
      result.current.handleGenerate('Short text');
    });

    expect(toast.error).toHaveBeenCalledWith(
      'Please write a bit more text for the AI to analyze context.',
      expect.any(Object)
    );
    expect(mockAction).not.toHaveBeenCalled();
  });

  it('should call the API and update suggestions upon successful generation', async () => {
    const mockTitles = ['Title 1', 'Title 2', 'Title 3'];
    mockAction.mockResolvedValueOnce(mockTitles);

    const { result } = renderHook(() => useGenerateTitles());
    const validContent = 'a'.repeat(60);

    act(() => {
      result.current.handleGenerate(validContent);
    });

    // Чекаємо, поки асинхронний startTransition оновить стейт
    await waitFor(() => {
      expect(result.current.suggestions).toEqual(mockTitles);
    });

    expect(mockAction).toHaveBeenCalledWith({ content: validContent });
  });

  it('should issue an error (toast) if the API request failed', async () => {
    // Тимчасово глушимо console.error, щоб він не спамив червоним у термінал під час тесту
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const errorMessage = 'API rate limit exceeded';
    mockAction.mockRejectedValueOnce(new Error(errorMessage));

    const { result } = renderHook(() => useGenerateTitles());
    const validContent = 'a'.repeat(60);

    act(() => {
      result.current.handleGenerate(validContent);
    });

    // Чекаємо, поки помилка пройде через catch і викличе toast
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(errorMessage, expect.any(Object));
    });

    expect(result.current.suggestions).toEqual([]);

    // Відновлюємо console.error для інших тестів
    consoleSpy.mockRestore();
  });

  it('should clear the suggestions list', async () => {
    const { result } = renderHook(() => useGenerateTitles());

    mockAction.mockResolvedValueOnce(['Title 1']);

    act(() => {
      result.current.handleGenerate('a'.repeat(60));
    });

    await waitFor(() => {
      expect(result.current.suggestions).toEqual(['Title 1']);
    });

    act(() => {
      result.current.clearSuggestions();
    });

    expect(result.current.suggestions).toEqual([]);
  });
});
