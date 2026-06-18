import { expect } from '@playwright/test';

export const USER_NAME = 'Test User';
export const PASSWORD = 'Test1234';

const ADDRESS_DATA = {
  firstName: 'Test',
  lastName: 'User',
  company: 'Test Company',
  address: '123 Test Street',
  address2: 'Apt 4B',
  country: 'United States',
  state: 'California',
  city: 'Los Angeles',
  zipcode: '90001',
  mobile: '1234567890',
};

export async function blockAds(page) {
  await page.route('**/*.doubleclick.net**', route => route.abort());
  await page.route('**/*.googlesyndication.com**', route => route.abort());
  await page.route('**/*.cedevita.com**', route => route.abort());
}

export async function registerUser(page, { name = USER_NAME, password = PASSWORD, email = `user_${Date.now()}@test.com`, address = ADDRESS_DATA } = {}) {
  await page.goto('/');
  await expect(page).toHaveTitle(/Automation Exercise/);

  await page.getByRole('link', { name: 'Signup / Login' }).click({ force: true });
  await expect(page.getByText('New User Signup!')).toBeVisible();

  await page.locator('[data-qa="signup-name"]').fill(name);
  await page.locator('[data-qa="signup-email"]').fill(email);
  await page.locator('[data-qa="signup-button"]').click({ force: true });
  await expect(page.getByText('ENTER ACCOUNT INFORMATION')).toBeVisible();

  await page.locator('#id_gender1').click({ force: true });
  await page.locator('[data-qa="password"]').fill(password);
  await page.locator('[data-qa="days"]').selectOption('1');
  await page.locator('[data-qa="months"]').selectOption('1');
  await page.locator('[data-qa="years"]').selectOption('1990');
  await page.locator('#newsletter').click({ force: true });
  await page.locator('#optin').click({ force: true });

  await page.locator('[data-qa="first_name"]').fill(address.firstName);
  await page.locator('[data-qa="last_name"]').fill(address.lastName);
  await page.locator('[data-qa="company"]').fill(address.company);
  await page.locator('[data-qa="address"]').fill(address.address);
  await page.locator('[data-qa="address2"]').fill(address.address2);
  await page.locator('[data-qa="country"]').selectOption(address.country);
  await page.locator('[data-qa="state"]').fill(address.state);
  await page.locator('[data-qa="city"]').fill(address.city);
  await page.locator('[data-qa="zipcode"]').fill(address.zipcode);
  await page.locator('[data-qa="mobile_number"]').fill(address.mobile);

  await page.locator('[data-qa="create-account"]').click({ force: true });
  await expect(page.getByText('ACCOUNT CREATED!')).toBeVisible();

  await page.getByRole('link', { name: 'Continue' }).click();
  await page.waitForURL('/', { timeout: 10000 });

  await expect(page.getByText(/Logged in as/)).toBeVisible();

  return email;
}

export async function deleteAccount(page) {
  await page.getByRole('link', { name: 'Delete Account' }).click({ force: true });
  await page.waitForLoadState('networkidle');
  await expect(page.getByText('ACCOUNT DELETED!')).toBeVisible();
  await page.getByRole('link', { name: 'Continue' }).click();
}
