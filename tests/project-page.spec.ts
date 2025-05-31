import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { HomePage } from '../pages/home-page';
import { ProjectPage } from '../pages/project-page';

test('Go To Sample Project Page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const projectPage = new ProjectPage(page);
    await loginPage.goto();

    await loginPage.login();

    await expect(homePage.newProjectButton).toBeVisible();

    await homePage.goToProject('Sample project - JBO 6');

    await expect(projectPage.newPlanButton).toBeVisible();
    await expect(projectPage.newFolderButton).toBeVisible();
    await expect(projectPage.fieldManamementSection).toBeVisible();
    await expect(projectPage.fieldManagementPlans).toBeVisible();
    await expect(projectPage.fieldManagementTasks).toBeVisible();

    await projectPage.fieldManagementTasks.click();

});