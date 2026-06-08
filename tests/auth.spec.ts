import { expect, test } from '@playwright/test';

test.describe('Core Authentication & Layout ', () => {
  test('should successfully load home page for authenticated user', async ({ page }) => {
    // 1. Переходимо на головну сторінку
    await page.goto('/');

    // 2. Перевіряємо, що додаток успішно завантажився і title коректний
    await expect(page).toHaveTitle(/NextOne/);

    // 3. Перевіряємо, що Better Auth успішно підставив сесію:
    // Кнопки "Sign In" бути не повинно
    const signInButton = page.locator('text=Sign In');
    await expect(signInButton).not.toBeVisible();

    // 4. Замість кнопок входу має відображатися інтерфейс авторизованого юзера
    const signOutButton = page.locator('text=Sign Out');
    await expect(signOutButton).toBeVisible({ timeout: 10000 });
  });
});
