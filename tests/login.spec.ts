import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';

test('Go To Login Page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

  await expect(loginPage.page).toHaveTitle(/Fieldwire/);

  await expect(loginPage.emailAddressInput).toBeEnabled();

  if(process.env.USER_NAME)
  await loginPage.emailAddressInput.fill(process.env.USER_NAME);

  await expect(loginPage.continueButton).toBeEnabled();

  await loginPage.continueButton.click();

  await expect(loginPage.passwordInput).toBeEnabled();

  if(process.env.PASSWORD)
  await loginPage.passwordInput.fill(process.env.PASSWORD);

  await expect(loginPage.loginButton).toBeEnabled();

  await loginPage.loginButton.click();

  await expect(loginPage.loginButton).toBeHidden();
});

