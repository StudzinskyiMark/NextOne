import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';



// 🔥 Явно обчислюємо шлях та перевіряємо результат завантаження
const envPath = path.resolve(__dirname, '.env.local');
const configResult = dotenv.config({ path: envPath });

if (configResult.error) {
  console.error(`❌ [PLAYWRIGHT ENV ERROR] File not found: ${envPath}`);
  console.error(configResult.error);
} else {
  console.log(`✅ [PLAYWRIGHT ENV] File loaded: ${envPath}`);
  // Перевірка чи змінні взагалі існують всередині файлу
  if (!process.env.TEST_USER_EMAIL) {
    console.warn(`⚠️ [PLAYWRIGHT ENV WARNING] File not found, missing TEST_USER_EMAIL: ${envPath}`);
  }
}

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
