import { expect, test } from '@playwright/test';

test.use({
  storageState: 'tests/.auth/user.json',
});

test('should create a post, find it in the feed, and leave a comment', async ({
  page,
  request,
}, testInfo) => {
  // 🌟 BEST PRACTICE: Робимо назву унікальною для кожного воркера, ретраю та запуску
  const uniqueId = `${testInfo.parallelIndex}-r${testInfo.retry}-${Date.now().toString().slice(-4)}`;
  const postTitle = `E2E Test: Title Worker ${uniqueId}`;
  const postStory = 'E2E test: story';
  const commentText = 'E2E test: comment';

  try {
    await page.goto('/');

    await page
      .getByRole('link', { name: 'Publish', exact: true })
      .filter({ visible: true })
      .click();

    await page.getByRole('textbox', { name: 'Give your research a clear' }).fill(postTitle);

    const editor = page.locator('.ProseMirror');
    await editor.click();

    await editor.pressSequentially(postStory, { delay: 10 });

    await page.waitForTimeout(600);

    await page.getByRole('button', { name: 'Publish' }).filter({ visible: true }).click(); // force: true

    await page.waitForURL('/blog', { timeout: 15000 });

    const newPostLink = page.getByRole('link', { name: postTitle });

    try {
      await expect(newPostLink).toBeVisible({ timeout: 3000 });
    } catch (error) {
      console.log(`[E2E] Post "${postTitle}" not found in feed initially. Reloading page...`);
      await page.reload();
      await expect(newPostLink).toBeVisible({ timeout: 7000 });
    }

    await newPostLink.click();

    await page.waitForURL(/\/blog\/.+/);

    try {
      await expect(page.getByRole('heading', { name: postTitle })).toBeVisible({ timeout: 3000 });
    } catch (error) {
      await page.reload();
      await expect(page.getByRole('heading', { name: postTitle })).toBeVisible({ timeout: 7000 });
    }

    await page.getByRole('textbox', { name: 'Write a comment...' }).fill(commentText);
    await page.getByRole('button', { name: 'Comment' }).click({ force: true });

    await expect(page.locator('p').filter({ hasText: 'E2E Tester' })).toBeVisible({
      timeout: 3000,
    });

    await expect(page.getByText(commentText)).toBeVisible();
  } finally {
    await request.post('/api/test/cleanup', {
      data: { title: postTitle },
      headers: {
        Authorization: `Bearer ${process.env.TEST_API_KEY}`,
      },
    });
  }
});
