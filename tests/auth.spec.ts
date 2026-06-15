import { expect, test } from '@playwright/test';

test.describe('Core Authentication & Layout', () => {
  test('should successfully load home page for authenticated user', async ({ page }) => {
    // 1. Переходимо на головну сторінку
    await page.goto('/');

    // 2. Перевіряємо, що додаток успішно завантажився і title коректний
    await expect(page).toHaveTitle(/NextOne/);

    // 3. Перевіряємо, що Better Auth успішно підставив сесію:
    // Кнопки "Sign In" бути не повинно
    const signInButton = page.locator('text=Sign In');
    await expect(signInButton).not.toBeVisible();

    // 4. Шукаємо кнопку нашого Dropdown-меню.
    // Playwright шукатиме кнопку, яка містить ім'я "E2E Tester" або ініціали фолбеку "E2"
    const userMenuTrigger = page.getByRole('button', { name: /E2E Tester|E2/i });
    await expect(userMenuTrigger).toBeVisible({ timeout: 10000 });

    // 5. Клікаємо по профілю, щоб відкрити Shadcn DropdownMenu
    await userMenuTrigger.click();

    // 6. Перевіряємо, що всередині меню з'явився пункт "Sign Out"
    // Shadcn автоматично додає роль 'menuitem' для елементів Dropdown
    const signOutMenuItem = page.getByRole('menuitem', { name: /Sign Out/i });
    await expect(signOutMenuItem).toBeVisible();
  });
});
