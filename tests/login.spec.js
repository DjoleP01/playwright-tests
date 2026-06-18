import { test, expect } from '@playwright/test';
import { blockAds, registerUser, deleteAccount, PASSWORD } from '../utils/helpers.js';

test.describe('Login', () => {
  test('TC3: Login User with incorrect email and password', async ({ page }) => {
    await page.goto('/login');
    await expect(page).toHaveTitle(/Automation Exercise/);

    await page.locator('[data-qa="login-email"]').fill('wrong@email.com');
    await page.locator('[data-qa="login-password"]').fill('wrongpass');
    await page.locator('[data-qa="login-button"]').click({ force: true });

    await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();
  });

  test('TC4: Logout User', async ({ page }) => {
    await blockAds(page);
    const email = await registerUser(page);

    await page.getByRole('link', { name: 'Logout' }).click({ force: true });
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('Login to your account')).toBeVisible();

    await page.locator('[data-qa="login-email"]').fill(email);
    await page.locator('[data-qa="login-password"]').fill(PASSWORD);
    await page.locator('[data-qa="login-button"]').click({ force: true });
    await page.waitForLoadState('networkidle');
    await expect(page.getByText(/Logged in as/)).toBeVisible();

    await deleteAccount(page);
  });

  test('TC2: Login User with correct email and password', async ({ page }) => {
    await blockAds(page);

    const email = await registerUser(page);

    // Logout
    await page.getByRole('link', { name: 'Logout' }).click({ force: true });
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('Login to your account')).toBeVisible();

    // Login with correct credentials
    await page.locator('[data-qa="login-email"]').fill(email);
    await page.locator('[data-qa="login-password"]').fill(PASSWORD);
    await page.locator('[data-qa="login-button"]').click({ force: true });
    await page.waitForLoadState('networkidle');
    await expect(page.getByText(/Logged in as/)).toBeVisible();

    await deleteAccount(page);
  });
});
