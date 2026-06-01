import { expect, test } from '@playwright/test';

test.describe('Dashboard & Core Features', () => {
  test('should open dashboard being already logged in', async ({ page }) => {
    // Відкриваємо головну сторінку
    await page.goto('/');

    // Перевіряємо, що ми НЕ бачимо кнопку "Sign In" (бо ми вже залогінені)
    const signInButton = page.locator('text=Sign In');
    await expect(signInButton).not.toBeVisible();

    // Перевіряємо, що твій додаток успішно завантажився
    await expect(page).toHaveTitle(/NextOne/);
  });

  test('should display presence status', async ({ page }) => {
    await page.goto('/');

    // Тут буде логіка перевірки системи присутності
    // Наприклад: перевірити, чи світиться зелений індикатор біля твого профілю
    const presenceIndicator = page.locator('[data-testid="presence-online"]');
    await expect(presenceIndicator).toBeVisible();
  });
});
