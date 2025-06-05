import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { HomePage } from '../pages/home-page';
import { ProjectPage } from '../pages/project-page';
import { ProjectFormsPage } from '../pages/project-forms/project-forms-page';
import { ManageProjectFormTemplatePage } from '../pages/project-forms/manage-project-form-template-page';
import { PreviewTemplateModal } from '../pages/project-forms/components/preview-template-modal';

test.describe('Project Forms Smoketests', async() => {
    const testProjectTitle = 'My first project';

    let loginPage: LoginPage;
    let homePage: HomePage;
    let projectPage: ProjectPage;
    let projectFormsPage: ProjectFormsPage;
    let manageProjectFormTemplatePage: ManageProjectFormTemplatePage;
    let previewTemplateModal: PreviewTemplateModal;
    let newTemplateTitle: '';

    test.beforeEach(async({ page }) => {
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        projectPage = new ProjectPage(page);
        projectFormsPage = new ProjectFormsPage(page);
        manageProjectFormTemplatePage = new ManageProjectFormTemplatePage(page);
        previewTemplateModal = new PreviewTemplateModal(page);

        await loginPage.login();

        await expect(homePage.newProjectButton).toBeVisible();

        await homePage.goToProject(testProjectTitle);

        await expect(projectPage.fieldManagementForms).toBeVisible();

        await projectPage.fieldManagementForms.click();

        newTemplateTitle = 'Test template ' + Math.random().toString(36).substring(2,7);
    })

    test('Create a new Blank Template', async () => {

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
            await expect(manageProjectFormTemplatePage.actionsDropdownHeaderButton).toBeVisible();
            await expect(manageProjectFormTemplatePage.publishButton).toBeVisible();
            await expect(manageProjectFormTemplatePage.previewButton).toBeVisible();
            await expect(manageProjectFormTemplatePage.unpublishedTemplateBanner).toBeVisible();
        });
    });

    test('Create a new template with pre-built template Daily Report, preview the template and then delete the unpublished template', async () => {
        const templateOption = 'Daily Report';
        const dailyReportTitle = newTemplateTitle + ' ' + templateOption;

        await test.step('Verify the Headers of the Project Forms Page', async() => {
            await expect(projectFormsPage.newFormButton).toBeVisible();
            await expect(projectFormsPage.actionsDropdown).toBeVisible();
        });

        await test.step('Create a new Template using the Create Form Template Modal', async() => {
            await projectFormsPage.createNewTemplate();

            await expect(projectFormsPage.createFormTemplateModal.modal).toBeVisible();
            await expect(projectFormsPage.createFormTemplateModal.createButton).toBeDisabled();
            await expect(projectFormsPage.createFormTemplateModal.templateNameInput).toBeEnabled();

            await projectFormsPage.createFormTemplateModal.createNewTemplate(dailyReportTitle, templateOption);
        });

        await test.step('Expect the Manage Project Form Template Page to display', async() => {
            await expect(manageProjectFormTemplatePage.container).toBeAttached();
            await expect(manageProjectFormTemplatePage.actionsDropdownHeaderButton).toBeVisible();
            await expect(manageProjectFormTemplatePage.publishButton).toBeVisible();
            await expect(manageProjectFormTemplatePage.previewButton).toBeVisible();
            await expect(manageProjectFormTemplatePage.unpublishedTemplateBanner).toBeVisible();
            await expect(await manageProjectFormTemplatePage.getFormSectionHeader('Weather')).toBeVisible();
        });

        await test.step('Verify Preview Template Modal appears with Preview feature', async() => {
            await manageProjectFormTemplatePage.previewButton.click();

            await expect(previewTemplateModal.container).toBeAttached();
        });

        await test.step('Verify Preview Template Modal can be closed', async() => {
            await previewTemplateModal.closeButton.click();

            await expect(previewTemplateModal.container).toBeHidden();
        });

        await test.step('Delete the template before publishing it', async() => {
            await manageProjectFormTemplatePage.deleteTemplate();

            await expect(await projectFormsPage.searchTemplateInTemplateTable(dailyReportTitle)).toBeHidden();
        });
    });

    test('Create a new template with pre-built template Inspection Request, publish template and delete published template', async () => {
        const templateOption = 'Inspection Request';
        const dailyReportTitle = newTemplateTitle + ' ' + templateOption;

        await test.step('Verify the Headers of the Project Forms Page', async() => {
            await expect(projectFormsPage.newFormButton).toBeVisible();
            await expect(projectFormsPage.actionsDropdown).toBeVisible();
        });

        await test.step('Create a new Template using the Create Form Template Modal', async() => {
            await projectFormsPage.createNewTemplate();

            await expect(projectFormsPage.createFormTemplateModal.modal).toBeVisible();

            await projectFormsPage.createFormTemplateModal.createNewTemplate(dailyReportTitle, templateOption);
        });

        await test.step('Expect the Manage Project Form Template Page to display', async() => {
            await expect(manageProjectFormTemplatePage.container).toBeAttached();
            await expect(manageProjectFormTemplatePage.publishButton).toBeVisible();
            await expect(manageProjectFormTemplatePage.unpublishedTemplateBanner).toBeVisible();
            await expect(await manageProjectFormTemplatePage.getFormSectionHeader('Inspection References')).toBeVisible();
        });

        await test.step('Publish the Template', async() => {
            await manageProjectFormTemplatePage.publishButton.click();

            await expect(manageProjectFormTemplatePage.unpublishButton).toBeAttached();
            await expect(manageProjectFormTemplatePage.unpublishButton).toBeVisible();
        });

        await test.step('Delete the template after publishing it', async() => {
            await manageProjectFormTemplatePage.deleteTemplate();

            await expect(await projectFormsPage.searchTemplateInTemplateTable(dailyReportTitle)).toBeHidden();
        });
    });

});