import { act, renderHook, waitFor } from '@testing-library/react';
import { toast } from 'sonner';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { authClient } from '@/lib/auth-client';

import { useSignIn } from './use-sign-in';

const mockPush = vi.fn();
const mockRefresh = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush, refresh: mockRefresh }),
  useSearchParams: () => ({ get: vi.fn(() => null) }),
}));

vi.mock('sonner', () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

vi.mock('@/lib/auth-client', () => ({
  authClient: {
    signIn: {
      email: vi.fn(),
      social: vi.fn(),
    },
  },
}));

describe('useSignIn', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should sign in successfully', async () => {
    const { result } = renderHook(() => useSignIn());
    const testData = { email: 'example@example.com', password: 'password' };

    vi.mocked(authClient.signIn.email).mockImplementation(async (options) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      options.fetchOptions?.onSuccess?.({ data: null } as any);
    });

    // Загортаємо в act, щоб React встиг синхронізувати транзицію
    await act(async () => {
      await result.current.signIn(testData);
    });

    expect(authClient.signIn.email).toHaveBeenCalledWith(expect.objectContaining(testData));
    expect(toast.success).toHaveBeenCalledWith('Sign In successfully!', { position: 'top-center' });
    expect(mockPush).toHaveBeenCalledWith('/');
    expect(mockRefresh).toHaveBeenCalled();
  });

  test('should sign in unsuccessfully', async () => {
    const { result } = renderHook(() => useSignIn());
    const testData = { email: 'example@example.com', password: 'password' };

    // Твій поточний мок, який імітує помилку від authClient
    vi.mocked(authClient.signIn.email).mockImplementation(async ({ fetchOptions }) => {
      fetchOptions?.onError?.({
        error: { message: 'Error signing in' },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
    });

    // Очікуємо, що проміс зареджектиться з помилкою бекенду 🛡️
    await act(async () => {
      await expect(result.current.signIn(testData)).rejects.toThrow('Error signing in');
    });

    // Всі інші перевірки залишаються без змін
    expect(authClient.signIn.email).toHaveBeenCalledWith(expect.objectContaining(testData));
    expect(toast.error).toHaveBeenCalledWith('Error signing in', {
      position: 'top-center',
    });
    expect(mockPush).not.toHaveBeenCalled();
    expect(mockRefresh).not.toHaveBeenCalled();
  });

  test('should handle loading state', async () => {
    const { result } = renderHook(() => useSignIn());
    const testData = { email: 'example@example.com', password: 'password' };

    // Створюємо ручний контроль над промісом 🕹️
    let resolveAuthPromise: (value: unknown) => void = () => {};
    const authPromise = new Promise((resolve) => {
      resolveAuthPromise = resolve;
    });

    vi.mocked(authClient.signIn.email).mockImplementation((options) => {
      return authPromise.then(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        options.fetchOptions?.onSuccess?.({ data: null } as any);
      });
    });

    expect(result.current.isSigningIn).toBe(false);

    // Запускаємо транзицію всередині act
    act(() => {
      result.current.signIn(testData);
    });

    // Тепер лоудінгу нікуди дітися, він 100% буде true, бо проміс "завис"
    expect(result.current.isSigningIn).toBe(true);

    // Вивільняємо наш проміс і чекаємо на його завершення
    await act(async () => {
      resolveAuthPromise(null);
      await authPromise;
    });

    // Після завершення транзиції статус гарантовано скидається
    expect(result.current.isSigningIn).toBe(false);
  });

  test('should sign in with social provider successfully', async () => {
    const { result } = renderHook(() => useSignIn());

    vi.mocked(authClient.signIn.social).mockImplementation(async (options) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      options.fetchOptions?.onSuccess?.({ data: null } as any);
    });

    await act(async () => {
      await result.current.signIn({ provider: 'google' });
    });

    expect(authClient.signIn.social).toHaveBeenCalledWith(
      expect.objectContaining({
        provider: 'google',
        callbackURL: '/',
      })
    );

    expect(toast.success).toHaveBeenCalledWith('Sign In successfully!', { position: 'top-center' });
    expect(mockPush).toHaveBeenCalledWith('/');
    expect(mockRefresh).toHaveBeenCalled();
  });

  test('should NOT sign in with social provider successfully', async () => {
    const { result } = renderHook(() => useSignIn());

    // Твій поточний мок для помилки соціального входу, який викликає onError...
    vi.mocked(authClient.signIn.social).mockImplementation(async ({ fetchOptions }) => {
      fetchOptions?.onError?.({
        error: { message: 'Error signing in' },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
    });

    // Оновлюємо цей блок, щоб він очікував на реджект промісу 🛡️
    await act(async () => {
      await expect(result.current.signIn({ provider: 'google' })).rejects.toThrow(
        'Error signing in'
      );
    });

    // Всі інші перевірки залишаються без змін
    expect(authClient.signIn.social).toHaveBeenCalledWith(
      expect.objectContaining({
        provider: 'google',
      })
    );
    expect(toast.error).toHaveBeenCalledWith('Error signing in', {
      position: 'top-center',
    });
    expect(mockPush).not.toHaveBeenCalled();
    expect(mockRefresh).not.toHaveBeenCalled();
  });

  test('should handle network error', async () => {
    const { result } = renderHook(() => useSignIn());
    const testData = { email: 'example@example.com', password: 'password' };

    vi.mocked(authClient.signIn.email).mockRejectedValue(new Error('Network error'));

    await expect(result.current.signIn(testData)).rejects.toThrow('Network error');

    expect(authClient.signIn.email).toHaveBeenCalledWith(expect.objectContaining(testData));
    expect(toast.error).toHaveBeenCalledWith('Network error', { position: 'top-center' });
  });
});
