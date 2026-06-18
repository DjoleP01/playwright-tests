import { test, expect } from '@playwright/test';
import { blockAds } from '../utils/helpers.js';

test('TC7: Verify Test Cases Page', async ({ page }) => {
  await blockAds(page);
  await page.goto('/');
  await expect(page).toHaveTitle(/Automation Exercise/);

  await page.getByRole('link', { name: 'Test Cases' }).first().click({ force: true });
  await expect(page).toHaveURL(/\/test_cases/);
});
