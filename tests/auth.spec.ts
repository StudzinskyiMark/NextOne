import { expect, test } from '@playwright/test';

test.describe('Core Authentication & Layout', () => {
  test('should successfully load home page for authenticated user', async ({ page }) => {
    // 1. Open the home page
    await page.goto('/');

    // 2. The app loaded and the title is correct
    await expect(page).toHaveTitle(/NextOne/);

    // 3. Better Auth restored the session:
    // there must be no "Sign In" button
    const signInButton = page.locator('text=Sign In');
    await expect(signInButton).not.toBeVisible();

    // 4. Find the user dropdown trigger.
    // It shows either the name "E2E Tester" or the fallback initials "E2"
    const userMenuTrigger = page.getByRole('button', { name: /E2E Tester|E2/i });
    await expect(userMenuTrigger).toBeVisible({ timeout: 10000 });

    // 5. Open the shadcn DropdownMenu
    await userMenuTrigger.click();

    // 6. The menu contains a "Sign Out" item
    // shadcn gives dropdown items the 'menuitem' role
    const signOutMenuItem = page.getByRole('menuitem', { name: /Sign Out/i });
    await expect(signOutMenuItem).toBeVisible();
  });
});
