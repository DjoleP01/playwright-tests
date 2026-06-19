import { test, expect } from '@playwright/test';
import { blockAds } from '../utils/helpers.js';

test.describe('Products', () => {

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

test('TC9: Search Product', async ({ page }) => {
  await blockAds(page);
  await page.goto('/');
  await expect(page).toHaveTitle(/Automation Exercise/);

  await page.getByRole('link', { name: 'Products' }).click({ force: true });
  await expect(page).toHaveURL(/\/products/);
  await expect(page.getByText('All Products')).toBeVisible();

  const searchTerm = 'Blue Top';
  await page.locator('#search_product').fill(searchTerm);
  await page.locator('#submit_search').click();
  await page.waitForLoadState('networkidle');

  await expect(page.getByText('Searched Products')).toBeVisible();
  const productNames = page.locator('.features_items .productinfo p');
  const count = await productNames.count();
  expect(count).toBeGreaterThan(0);
  for (let i = 0; i < count; i++) {
    await expect(productNames.nth(i)).toContainText(searchTerm);
  }
});

});
