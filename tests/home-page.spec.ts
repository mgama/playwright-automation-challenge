import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { HomePage } from '../pages/home-page';

test('Go To Home Page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    await loginPage.goto();

  await loginPage.login();

  await expect(homePage.newProjectButton).toBeVisible();
  await expect(homePage.generateReportsButton).toBeVisible();
});

