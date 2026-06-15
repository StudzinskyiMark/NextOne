import { expect, test as setup } from '@playwright/test';

import { STORAGE_STATE } from '../playwright.config';

const TEST_USER = {
  email: process.env.TEST_USER_EMAIL || 'e2e-test@nextone.com',
  password: process.env.TEST_USER_PASSWORD || 'Password123!',
  name: 'E2E Tester',
};

setup('authenticate user', async ({ request, page }) => {
  const signUpResponse = await request.post('/api/auth/sign-up/email', {
    data: {
      email: TEST_USER.email,
      password: TEST_USER.password,
      name: TEST_USER.name,
    },
  });

  if (!signUpResponse.ok()) {
    const errorBody = await signUpResponse.text();
    console.log(`[SIGN-UP INFO] Status: ${signUpResponse.status()}, Response: ${errorBody}`);
  }

  expect(signUpResponse.status()).toBeLessThan(500);

  await page.goto('/auth/sign-in');

  await page.fill('input[name="email"]', TEST_USER.email);
  await page.fill('input[name="password"]', TEST_USER.password);

  await page.click('button[type="submit"]');

  await page.waitForURL('/');

  const userMenuTrigger = page.getByRole('button', { name: /E2E Tester|E2/i });
  await expect(userMenuTrigger).toBeVisible({ timeout: 10000 });

  await page.context().storageState({ path: STORAGE_STATE });
});
