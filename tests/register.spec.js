import { test } from '@playwright/test';
import { blockAds, registerUser, deleteAccount } from '../utils/helpers.js';

test('TC1: Register User', async ({ page }) => {
  await blockAds(page);
  await registerUser(page);
  await deleteAccount(page);
});
