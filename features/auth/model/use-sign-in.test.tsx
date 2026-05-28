import { renderHook, waitFor } from '@testing-library/react';
import { toast } from 'sonner';
import { describe, expect, test, vi } from 'vitest';

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

    await result.current.signIn(testData);

    expect(authClient.signIn.email).toHaveBeenCalledWith(expect.objectContaining(testData));
    expect(toast.success).toHaveBeenCalledWith('Sign In successfully!', { position: 'top-center' });
    expect(mockPush).toHaveBeenCalledWith('/');
    expect(mockRefresh).toHaveBeenCalled();
  });

  test('should sign in unsuccessfully', async () => {
    const { result } = renderHook(() => useSignIn());

    const testData = { email: 'example@example.com', password: 'password' };

    vi.mocked(authClient.signIn.email).mockImplementation(async (options) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      options.fetchOptions?.onError?.({ error: { message: 'Error signing in' } } as any);
    });

    await result.current.signIn(testData);

    expect(authClient.signIn.email).toHaveBeenCalledWith(expect.objectContaining(testData));
    expect(toast.error).toHaveBeenCalledWith('Error signing in', { position: 'top-center' });
    expect(mockPush).not.toHaveBeenCalled();
    expect(mockRefresh).not.toHaveBeenCalled();
  });

  test('should handle loading state', async () => {
    const { result } = renderHook(() => useSignIn());

    const testData = { email: 'example@example.com', password: 'password' };

    vi.mocked(authClient.signIn.email).mockImplementation((options) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          options.fetchOptions?.onSuccess?.({ data: null } as any);
          resolve(null);
        }, 50);
      });
    });

    expect(result.current.isSigningIn).toBe(false);

    const signInPromise = result.current.signIn(testData);

    await waitFor(() => {
      expect(result.current.isSigningIn).toBe(true);
    });

    await signInPromise;

    await waitFor(() => {
      expect(result.current.isSigningIn).toBe(false);
    });
  });

  test('should sign in with social provider successfully', async () => {
    const { result } = renderHook(() => useSignIn());

    vi.mocked(authClient.signIn.social).mockImplementation(async (options) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      options.fetchOptions?.onSuccess?.({ data: null } as any);
    });

    await result.current.signIn({ provider: 'google' });

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

    vi.mocked(authClient.signIn.social).mockImplementation(async (options) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      options.fetchOptions?.onError?.({ error: { message: 'Error signing in' } } as any);
    });

    await result.current.signIn({ provider: 'google' });

    expect(authClient.signIn.social).toHaveBeenCalledWith(
      expect.objectContaining({
        provider: 'google',
        callbackURL: '/',
      })
    );

    expect(toast.error).toHaveBeenCalledWith('Error signing in', { position: 'top-center' });
    expect(mockPush).not.toHaveBeenCalled();
    expect(mockRefresh).not.toHaveBeenCalled();
  });

  test('should handle network error', async () => {
    const { result } = renderHook(() => useSignIn());

    const testData = { email: 'example@example.com', password: 'password' };

    vi.mocked(authClient.signIn.email).mockRejectedValue(new Error('Network error'));

    await result.current.signIn(testData);

    expect(authClient.signIn.email).toHaveBeenCalledWith(expect.objectContaining(testData));

    expect(toast.error).toHaveBeenCalledWith('Network error', {
      position: 'top-center',
    });

    expect(mockPush).not.toHaveBeenCalled();
    expect(mockRefresh).not.toHaveBeenCalled();
  });
});
