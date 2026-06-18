import { test, expect } from '@playwright/test';
import { blockAds } from '../utils/helpers.js';
import path from 'path';

test('TC6: Contact Us Form', async ({ page }) => {
  await blockAds(page);
  await page.goto('/');
  await expect(page).toHaveTitle(/Automation Exercise/);

  await page.getByRole('link', { name: 'Contact us' }).click({ force: true });
  await expect(page.getByText('GET IN TOUCH')).toBeVisible();

  await page.waitForLoadState('networkidle');

  await page.locator('[data-qa="name"]').fill('Test User');
  await page.locator('[data-qa="email"]').fill(`user_${Date.now()}@test.com`);
  await page.locator('[data-qa="subject"]').fill('Test Subject');
  await page.locator('[data-qa="message"]').fill('This is a test message for the contact form.');

  await page.locator('input[type="file"]').setInputFiles(path.resolve('utils', 'test-upload.txt'));

  page.once('dialog', dialog => dialog.accept());
  await page.locator('[data-qa="submit-button"]').click();

  await expect(page.locator('.status.alert-success')).toHaveText('Success! Your details have been submitted successfully.', { timeout: 5000 });

  await page.getByRole('link', { name: 'Home' }).first().click();
  await expect(page).toHaveTitle(/Automation Exercise/);
});
