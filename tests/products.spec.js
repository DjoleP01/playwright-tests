import { test, expect } from '@playwright/test';
import { blockAds } from '../utils/helpers.js';

test('TC8: Verify All Products and product detail page', async ({ page }) => {
  await blockAds(page);
  await page.goto('/');
  await expect(page).toHaveTitle(/Automation Exercise/);

  await page.getByRole('link', { name: 'Products' }).click({ force: true });
  await expect(page).toHaveURL(/\/products/);
  await expect(page.getByText('All Products')).toBeVisible();
  await expect(page.locator('.features_items')).toBeVisible();

  await page.getByRole('link', { name: 'View Product' }).first().click({ force: true });
  await expect(page).toHaveURL(/\/product_details\/1/);

  await expect(page.locator('.product-details h2')).toHaveText('Blue Top');
  await expect(page.locator('.product-details')).toContainText('Category: Women > Tops');
  await expect(page.locator('.product-details')).toContainText('Rs. 500');
  await expect(page.locator('.product-details')).toContainText('Availability:');
  await expect(page.locator('.product-details')).toContainText('Condition:');
  await expect(page.locator('.product-details')).toContainText('Brand:');
});
