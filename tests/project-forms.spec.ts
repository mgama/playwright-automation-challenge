import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { HomePage } from '../pages/home-page';
import { ProjectPage } from '../pages/project-page';
import { ProjectFormsPage } from '../pages/project-forms/project-forms-page';
import { ManageProjectFormTemplatePage } from '../pages/project-forms/manage-project-form-template-page';

test.describe('Project Forms Smoketests', async() => {
    const testProjectTitle = 'My first project';

    let loginPage: LoginPage;
    let homePage: HomePage;
    let projectPage: ProjectPage;
    let projectFormsPage: ProjectFormsPage;
    let manageProjectFormTemplatePage: ManageProjectFormTemplatePage;
    let newTemplateTitle: '';

    test.beforeEach(async({ page }) => {
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        projectPage = new ProjectPage(page);
        projectFormsPage = new ProjectFormsPage(page);
        manageProjectFormTemplatePage = new ManageProjectFormTemplatePage(page);

        await loginPage.login();

        await expect(homePage.newProjectButton).toBeVisible();

        await homePage.goToProject(testProjectTitle);

        await expect(projectPage.fieldManagementForms).toBeVisible();

        await projectPage.fieldManagementForms.click();

        newTemplateTitle = 'Test template ' + Math.random().toString(36).substring(2,7);
    })

    test('Create a New Form Template (Blank Template)', async () => {

        await test.step('Verify the Headers of the Project Forms Page', async() => {
            await expect(projectFormsPage.newFormButton).toBeVisible();
            await expect(projectFormsPage.actionsDropdown).toBeVisible();
        });

        await test.step('Try to create a new Template using the Create Form Template Modal', async() => {
            await projectFormsPage.createNewTemplate();

            await expect(projectFormsPage.createFormTemplateModal.modal).toBeVisible();
            await expect(projectFormsPage.createFormTemplateModal.createButton).toBeDisabled();
            await expect(projectFormsPage.createFormTemplateModal.templateNameInput).toBeEnabled();

            await projectFormsPage.createFormTemplateModal.createNewTemplate(newTemplateTitle, 'Blank Template');

        });

        await test.step('Expect the Manage Project Form Template Page to display', async() => {
            await expect(manageProjectFormTemplatePage.container).toBeAttached();
        });
    });

});