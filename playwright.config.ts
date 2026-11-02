import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

const envPath = path.resolve(__dirname, '.env.local');
const configResult = fs.existsSync(envPath) ? dotenv.config({ path: envPath }) : dotenv.config();

if (configResult.error) {
  console.error(`❌ [PLAYWRIGHT ENV ERROR] File not found: ${envPath}`);
  console.error(configResult.error);
} else {
  console.log(`✅ [PLAYWRIGHT ENV] File loaded: ${envPath}`);
  // Check that the expected variables are actually set
  if (!process.env.TEST_USER_EMAIL) {
    console.warn(`⚠️ [PLAYWRIGHT ENV WARNING] File not found, missing TEST_USER_EMAIL: ${envPath}`);
  }
}

export const STORAGE_STATE = path.join(__dirname, 'tests/.auth/user.json');

const PORT = process.env.PORT || 3000;
const BASE_URL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: './tests',
  fullyParallel: false, // Run tests sequentially: they share one test user and its data
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0, // 2 retries on CI to absorb flaky network issues
  workers: process.env.CI ? 1 : undefined, // One worker on CI to avoid overloading the GitHub runner
  //   reporter: process.env.CI ? 'blob' : 'html',
  reporter: process.env.CI ? 'github' : 'html', // GitHub annotations on CI

  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry', // Record a trace only when a test is retried
    video: 'on-first-retry',
    // Timeouts for actions (clicks, typing) and navigation
    actionTimeout: 10000,
    navigationTimeout: 15000,
  },

  /* Test projects and their order */
  projects: [
    // 1. Setup: sign in once, runs first
    {
      name: 'setup',
      testMatch: /auth\.setup\.ts/,
    },

    // 2. Main tests: run only after 'setup' succeeds
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // Reuse the saved auth cookies in every test
        storageState: STORAGE_STATE,
      },
      dependencies: ['setup'], // Depends on the setup project
    },

    // 3. Mobile viewport
    {
      name: 'mobile-chrome',
      use: {
        ...devices['Pixel 5'],
        storageState: STORAGE_STATE,
      },
      dependencies: ['setup'],
    },
  ],

  /* Start the app server for the tests */
  webServer: {
    // CI tests the production build ('pnpm start'); locally use 'pnpm dev'
    command: process.env.CI ? 'pnpm start' : 'pnpm dev',
    url: BASE_URL,
    reuseExistingServer: true,
    timeout: 120 * 1000,
  },
});
