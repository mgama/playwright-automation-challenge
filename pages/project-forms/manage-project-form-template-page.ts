import { type Locator, type Page } from '@playwright/test';

export class ManageProjectFormTemplatePage {
  readonly page: Page;
  readonly container: Locator; 
  readonly formSectionHeader: Locator;
  readonly publishButton: Locator;
  readonly unpublishButton: Locator;
  readonly previewButton: Locator;
  readonly actionsDropdownHeaderButton: Locator;
  readonly duplicationDropdownOption: Locator;
  readonly publishToAccountDropdownOption: Locator;
  readonly deleteDropdownOption: Locator;
  readonly unpublishedTemplateBanner: Locator;
  readonly deleteTemplateConfirmButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.container = this.page.locator('manage-project-form-template-page');
    this.unpublishedTemplateBanner = this.container.locator('fw-banner.form-template-unpublished-warning-banner');
    this.publishButton = this.container.locator('[data-e2e="form-template-header-publish-btn"]');
    this.unpublishButton = this.container.locator('[data-e2e="form-template-header-unpublish-btn"]');
    this.previewButton = this.container.locator('[data-e2e="form-template-header-preview-btn"]');
    this.formSectionHeader = this.container.locator('[data-e2e="form-section-header-name"]');
    this.actionsDropdownHeaderButton = this.container.locator('[data-e2e="manage-form-template-actions-dropdown-btn"]');
    this.duplicationDropdownOption = this.container.locator('[data-e2e="manage-form-template-actions-dropdown-duplicate-btn"]');
    this.publishToAccountDropdownOption = this.container.locator('[data-e2e="manage-form-template-actions-dropdown-publish-btn"]');
    this.deleteDropdownOption = this.container.locator('[data-e2e="manage-form-template-actions-dropdown-delete-btn"]');
    this.deleteTemplateConfirmButton = this.page.locator('[data-e2e="confirm-action-modal-action-btn"]');
  }

  async getFormSectionHeader(headerSectionTitle: string) {
    return this.formSectionHeader.filter({hasText: headerSectionTitle});
  }

  async selectAction(actionName: string) {
    await this.actionsDropdownHeaderButton.click();
    switch(actionName){
        case 'Duplicate':
            await this.duplicationDropdownOption.click();
            break;
        case 'Publish to account':
            await this.publishButton.click();
            break;
        case 'Delete':
            await this.deleteDropdownOption.click();
            break;
        default:
            console.log('Warning: No action was selected from the dropdown because it did not match possible action name');
            break;
    }
  }

  async deleteTemplate() {
    await this.selectAction('Delete');
    await this.deleteTemplateConfirmButton.click();
  }
}