import { test, expect } from '@playwright/test';

const userName = 'Test User';
const password = 'Test1234';
const randomEmail = `user_${Date.now()}@test.com`;

test('TC1: Register User', async ({ page }) => {
  // 1-2. Navigate to url
  await page.goto('/');

  // 3. Verify that home page is visible successfully
  await expect(page).toHaveTitle(/Automation Exercise/);

  // 4. Click on 'Signup / Login' button
  await page.getByRole('link', { name: 'Signup / Login' }).click();

  // 5. Verify 'New User Signup!' is visible
  await expect(page.getByText('New User Signup!')).toBeVisible();

  // 6. Enter name and email address
  await page.locator('[data-qa="signup-name"]').fill(userName);
  await page.locator('[data-qa="signup-email"]').fill(randomEmail);

  // 7. Click 'Signup' button
  await page.locator('[data-qa="signup-button"]').click();

  // 8. Verify that 'ENTER ACCOUNT INFORMATION' is visible
  await expect(page.getByText('ENTER ACCOUNT INFORMATION')).toBeVisible();

  // 9. Fill details: Title, Name, Email, Password, Date of birth
  await page.locator('#id_gender1').click();
  await page.locator('[data-qa="password"]').fill(password);
  await page.locator('[data-qa="days"]').selectOption('1');
  await page.locator('[data-qa="months"]').selectOption('1');
  await page.locator('[data-qa="years"]').selectOption('1990');

  // 10. Select checkbox 'Sign up for our newsletter!'
  await page.locator('#newsletter').check();

  // 11. Select checkbox 'Receive special offers from our partners!'
  await page.locator('#optin').check();

  // 12. Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
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

  // 13. Click 'Create Account' button
  await page.locator('[data-qa="create-account"]').click();

  // 14. Verify that 'ACCOUNT CREATED!' is visible
  await expect(page.getByText('ACCOUNT CREATED!')).toBeVisible();

  // 15. Click 'Continue' button
  await page.locator('[data-qa="continue-button"]').click();

  // 16. Verify that 'Logged in as username' is visible
  await expect(page.getByText(`Logged in as ${userName}`)).toBeVisible();

  // 17. Click 'Delete Account' button
  await page.getByRole('link', { name: 'Delete Account' }).click();

  // 18. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
  await expect(page.getByText('ACCOUNT DELETED!')).toBeVisible();
  await page.locator('[data-qa="continue-button"]').click();
});
