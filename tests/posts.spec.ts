import { expect, test } from '@playwright/test';

test.use({
  storageState: 'tests/.auth/user.json',
});

// 🌟 Передаємо testInfo другим параметром у тест
test('should create a post, find it in the feed, and leave a comment', async ({
  page,
  request,
}, testInfo) => {
  // Гарантує унікальну назву для кожного паралельного потоку (напр., "E2E Test: Title Worker 0")
  const postTitle = `E2E Test: Title Worker ${testInfo.parallelIndex}`;
  const postStory = 'E2E test: story';
  const commentText = 'E2E test: comment';

  try {
    // 1. Перехід та створення поста
    await page.goto('/');
    await page.getByRole('link', { name: 'Publish' }).click();

    await page.getByRole('textbox', { name: 'Give your research a clear' }).fill(postTitle);
    await page.getByRole('textbox', { name: 'Tell your story, paste code,' }).fill(postStory);
    await page.getByRole('button', { name: 'Publish' }).click({ force: true });

    // 2. Стабілізація: чекаємо успішного збереження в БД через тост
    // 2. Стабілізація: даємо серверу та БД час відпрацювати під навантаженням воркерів (15 секунд)
    await expect(page.getByText('Successfully published!')).toBeVisible({ timeout: 15000 });

    // Чекаємо автоматичного клієнтського редіректу, який робить твій хук
    await page.waitForURL('/blog');

    // 3. Перевірка у фіді та перехід всередину поста
    const newPostLink = page.getByRole('link', { name: postTitle });
    await expect(newPostLink).toBeVisible();
    await newPostLink.click();

    // 🌟 СТАБІЛІЗАЦІЯ: Чекаємо, поки URL зміниться на динамічний роут поста
    // Регулярний вираз /\/blog\/.+/ означає: "/blog/і-далі-будь-який-id"
    await page.waitForURL(/\/blog\/.+/);

    // 🌟 ЗАХИСТ ВІД ЛАГУ КЕШУ СЕРВЕРА
    // Даємо 3 секунди на появу заголовка. Якщо сервер видав "Post not found",
    // перехоплюємо помилку, робимо жорсткий релоад сторінки і перевіряємо знову.
    try {
      await expect(page.getByRole('heading', { name: postTitle })).toBeVisible({ timeout: 3000 });
    } catch (error) {
      // Якщо впали сюди — сторінка закешувала "Not Found". Оновлюємо її.
      await page.reload();
      await expect(page.getByRole('heading', { name: postTitle })).toBeVisible({ timeout: 7000 });
    }

    // 4. Залишаємо коментар
    // Тепер сторінка точно завантажилась клієнтом, і поле буде знайдено миттєво
    await page.getByRole('textbox', { name: 'Write a comment...' }).fill(commentText);
    await page.getByRole('button', { name: 'Comment' }).click({ force: true });
    await expect(page.getByText('E2E Tester')).toBeVisible();
    await expect(page.getByText(commentText)).toBeVisible();
  } finally {
    // 5. Автоматичне очищення: відпрацює НАВІТЬ якщо тест упаде на кроці 3 чи 4
    await request.post('/api/test/cleanup', {
      data: { title: postTitle },
    });
  }
});
