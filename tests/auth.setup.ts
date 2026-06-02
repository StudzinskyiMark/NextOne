import { test as setup } from '@playwright/test';

import { STORAGE_STATE } from '../playwright.config';

const TEST_USER = {
  email: process.env.TEST_USER_EMAIL || 'e2e-test@nextone.com',
  password: process.env.TEST_USER_PASSWORD || 'Password123!',
  name: 'E2E Tester',
};

setup('authenticate user', async ({ request, page }) => {
  /* 🏗️ КРОК 1: Програмний сід користувача через точний ендпоїнт Better Auth */
  // Додаємо /email наприкінці, щоб Better Auth розпізнав метод реєстрації 🎯
  await request.post('/api/auth/sign-up/email', {
    data: {
      email: TEST_USER.email,
      password: TEST_USER.password,
      name: TEST_USER.name,
    },
  });

  /* 🔐 КРОК 2: Авторизація через UI сторінку входу */
  await page.goto('/auth/sign-in');

  // Заповнюємо твої форми, які лежать у features/auth/forms/sign-in-form.tsx 💻
  await page.fill('input[name="email"]', TEST_USER.email);
  await page.fill('input[name="password"]', TEST_USER.password);

  await page.click('button[type="submit"]');

  /* 🎯 КРОК 3: Очікування головної сторінки та збереження сесії */
  await page.waitForURL('/');

  await page.context().storageState({ path: STORAGE_STATE });
});
