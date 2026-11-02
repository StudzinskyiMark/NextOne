import { expect, test as setup } from '@playwright/test';

import { STORAGE_STATE } from '../playwright.config';

const TEST_USER = {
  email: process.env.TEST_USER_EMAIL || 'e2e-test@nextone.com',
  password: process.env.TEST_USER_PASSWORD || 'Password123!',
  name: 'E2E Tester',
};

setup('authenticate user', async ({ request, page }) => {
  // A fresh `next dev` compiles each route on first hit (~20s), so allow extra time.
  setup.setTimeout(90_000);

  const signUpResponse = await request.post('/api/auth/sign-up/email', {
    data: {
      email: TEST_USER.email,
      password: TEST_USER.password,
      name: TEST_USER.name,
    },
    timeout: 60_000,
  });

  if (!signUpResponse.ok()) {
    const errorBody = await signUpResponse.text();
    console.log(`[SIGN-UP INFO] Status: ${signUpResponse.status()}, Response: ${errorBody}`);
  }

  expect(signUpResponse.status()).toBeLessThan(500);

  await page.goto('/auth/sign-in', { timeout: 60_000 });

  await page.fill('input[name="email"]', TEST_USER.email);
  await page.fill('input[name="password"]', TEST_USER.password);

  await page.click('button[type="submit"]');

  await page.waitForURL('/', { timeout: 60_000 });

  const userMenuTrigger = page.getByRole('button', { name: /E2E Tester|E2/i });
  await expect(userMenuTrigger).toBeVisible({ timeout: 10000 });

  await page.context().storageState({ path: STORAGE_STATE });
});
