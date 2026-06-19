import { act, renderHook } from '@testing-library/react';
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
    const validContent = 'a'.repeat(60); // 60 символів, щоб пройти валідацію

    await act(async () => {
      result.current.handleGenerate(validContent);
    });

    expect(mockAction).toHaveBeenCalledWith({ content: validContent });
    expect(result.current.suggestions).toEqual(mockTitles);
  });

  it('should issue an error (toast) if the API request failed', async () => {
    const errorMessage = 'API rate limit exceeded';
    mockAction.mockRejectedValueOnce(new Error(errorMessage));

    const { result } = renderHook(() => useGenerateTitles());
    const validContent = 'a'.repeat(60);

    await act(async () => {
      result.current.handleGenerate(validContent);
    });

    expect(toast.error).toHaveBeenCalledWith(errorMessage, expect.any(Object));
    expect(result.current.suggestions).toEqual([]);
  });

  it('should clear the suggestions list', async () => {
    const { result } = renderHook(() => useGenerateTitles());

    // Спочатку симулюємо наявність заголовків (хак для тесту)
    mockAction.mockResolvedValueOnce(['Title 1']);
    await act(async () => {
      result.current.handleGenerate('a'.repeat(60));
    });

    // Тепер перевіряємо очищення
    act(() => {
      result.current.clearSuggestions();
    });

    expect(result.current.suggestions).toEqual([]);
  });
});
