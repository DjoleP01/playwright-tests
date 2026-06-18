import { test, expect } from '@playwright/test';
import { blockAds, registerUser, deleteAccount, USER_NAME, PASSWORD } from '../utils/helpers.js';

test('TC1: Register User', async ({ page }) => {
  await blockAds(page);
  await registerUser(page);
  await deleteAccount(page);
});

test('TC5: Register User with Existing Email', async ({ page }) => {
  await blockAds(page);
  const email = await registerUser(page);

  await page.getByRole('link', { name: 'Logout' }).click({ force: true });
  await page.waitForLoadState('networkidle');

  await page.getByRole('link', { name: 'Signup / Login' }).click({ force: true });
  await expect(page.getByText('New User Signup!')).toBeVisible();

  await page.locator('[data-qa="signup-name"]').fill(USER_NAME);
  await page.locator('[data-qa="signup-email"]').fill(email);
  await page.locator('[data-qa="signup-button"]').click({ force: true });

  await expect(page.getByText('Email Address already exist!')).toBeVisible();

  await page.locator('[data-qa="login-email"]').fill(email);
  await page.locator('[data-qa="login-password"]').fill(PASSWORD);
  await page.locator('[data-qa="login-button"]').click({ force: true });
  await page.waitForLoadState('networkidle');
  await deleteAccount(page);
});
