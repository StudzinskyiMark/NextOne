import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// 🔥 Змушуємо Playwright прочитати саме .env.local файл
dotenv.config({ path: path.resolve(__dirname, '.env.local') });

// Далі йде твій звичайний експорт конфігу...
// export default defineConfig({ ... })

export const STORAGE_STATE = path.join(__dirname, 'tests/.auth/user.json');

const PORT = process.env.PORT || 3000;
const BASE_URL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true, // Запуск тестів паралельно для максимальної швидкості
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0, // На CI даємо 2 спроби (захист від випадкових мережевих флуктуацій)
  workers: process.env.CI ? 2 : undefined, // Обмежуємо воркери на CI, щоб не перевантажити раннер GitHub
  reporter: process.env.CI ? 'blob' : 'html', // Ефективніший репортер для CI

  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry', // Записує відео/скріншоти помилок тільки якщо тест упав
    video: 'on-first-retry',
    // Налаштування таймаутів для екшенів (кліки, введення тексту)
    actionTimeout: 10000,
    navigationTimeout: 15000,
  },

  /* 🏗️ Налаштування проектів та етапів тестування */
  projects: [
    // 1. Крок підготовки: Авторизація. Виконується найпершим!
    {
      name: 'setup',
      testMatch: /auth\.setup\.ts/,
    },

    // 2. Основні тести: Запускаються ТІЛЬКИ після успішного 'setup'
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // Автоматично підкидаємо збережені куки авторизації у кожен тест 🔐
        storageState: STORAGE_STATE,
      },
      dependencies: ['setup'], // Зв'язуємо з першим кроком
    },

    //  3. (Опціонально) Перевірка мобільного інтерфейсу, якщо треба
    {
      name: 'mobile-chrome',
      use: {
        ...devices['Pixel 5'],
        storageState: STORAGE_STATE,
      },
      dependencies: ['setup'],
    },
  ],

  /* 🚀 Розумний запуск локального сервера */
  webServer: {
    // На CI краще ганяти 'pnpm start' (production build), бо 'dev' працює повільніше і споживає більше пам'яті
    command: process.env.CI ? 'pnpm start' : 'pnpm dev',
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
