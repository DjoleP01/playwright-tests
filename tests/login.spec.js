import { test, expect } from '@playwright/test';

test.describe('Login', () => {
  const userName = 'Test User';
  const password = 'Test1234';

  test('TC3: Login User with incorrect email and password', async ({ page }) => {
    await page.goto('/login');
    await expect(page).toHaveTitle(/Automation Exercise/);

    await page.locator('[data-qa="login-email"]').fill('wrong@email.com');
    await page.locator('[data-qa="login-password"]').fill('wrongpass');
    await page.locator('[data-qa="login-button"]').click({ force: true });

    await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();
  });

  test('TC2: Login User with correct email and password', async ({ page }) => {
    const randomEmail = `user_${Date.now()}@test.com`;

    // Block ad domains to prevent redirects
    await page.route('**/*.doubleclick.net**', route => route.abort());
    await page.route('**/*.googlesyndication.com**', route => route.abort());
    await page.route('**/*.cedevita.com**', route => route.abort());

    // Register a user first
    await page.goto('/');
    await expect(page).toHaveTitle(/Automation Exercise/);
    await page.getByRole('link', { name: 'Signup / Login' }).click({ force: true });
    await expect(page.getByText('New User Signup!')).toBeVisible();
    await page.locator('[data-qa="signup-name"]').fill(userName);
    await page.locator('[data-qa="signup-email"]').fill(randomEmail);
    await page.locator('[data-qa="signup-button"]').click({ force: true });
    await expect(page.getByText('ENTER ACCOUNT INFORMATION')).toBeVisible();
    await page.locator('#id_gender1').click({ force: true });
    await page.locator('[data-qa="password"]').fill(password);
    await page.locator('[data-qa="days"]').selectOption('1');
    await page.locator('[data-qa="months"]').selectOption('1');
    await page.locator('[data-qa="years"]').selectOption('1990');
    await page.locator('#newsletter').click({ force: true });
    await page.locator('#optin').click({ force: true });
    await page.locator('[data-qa="first_name"]').fill('Test');
    await page.locator('[data-qa="last_name"]').fill('User');
    await page.locator('[data-qa="company"]').fill('Test Company');
    await page.locator('[data-qa="address"]').fill('123 Test Street');
    await page.locator('[data-qa="address2"]').fill('Apt 4B');
    await page.locator('[data-qa="country"]').selectOption('United States');
    await page.locator('[data-qa="state"]').fill('California');
    await page.locator('[data-qa="city"]').fill('Los Angeles');
    await page.locator('[data-qa="zipcode"]').fill('90001');
    await page.locator('[data-qa="mobile_number"]').fill('1234567890');
    await page.locator('[data-qa="create-account"]').click({ force: true });
    await expect(page.getByText('ACCOUNT CREATED!')).toBeVisible();
    await page.locator('[data-qa="continue-button"]').click({ force: true });
    await page.waitForLoadState('networkidle');
    await expect(page.getByText(/Logged in as/)).toBeVisible();

    // Logout
    await page.getByRole('link', { name: 'Logout' }).click({ force: true });
    await page.waitForLoadState('networkidle');

    // Verify navigated to login page
    await expect(page.getByText('Login to your account')).toBeVisible();

    // Login with correct credentials
    await page.locator('[data-qa="login-email"]').fill(randomEmail);
    await page.locator('[data-qa="login-password"]').fill(password);
    await page.locator('[data-qa="login-button"]').click({ force: true });
    await page.waitForLoadState('networkidle');

    // Verify logged in
    await expect(page.getByText(/Logged in as/)).toBeVisible();

    // Delete account
    await page.getByRole('link', { name: 'Delete Account' }).click({ force: true });
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('ACCOUNT DELETED!')).toBeVisible();
    await page.locator('[data-qa="continue-button"]').click({ force: true });
  });
});
