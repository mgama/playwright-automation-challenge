// modal-dialog create-new-form-template-modal modal-small

import { expect, type Locator, type Page } from '@playwright/test';

export class CreateFormTemplateModal {
  readonly page: Page;
  readonly modal: Locator; 
  readonly createButton: Locator;
  readonly templateNameInput: Locator;
//   readonly createNewTemplateButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.modal = this.page.locator('.create-new-form-template-modal');
    this.createButton = this.page.getByRole('button', {name: 'Create'});
    this.templateNameInput = this.modal.locator('[data-e2e="create-form-template-modal-name-input"]');
    // this.actionsDropdown = this.page.locator('[data-e2e="forms-actions-dropdown-btn"]');
    // this.newTemplateButton = this.page.locator('[data-e2e="new-form-dropdown-new-template-btn"]');
    // this.createNewTemplateButton = this.page.locator('create-new-template-button');
  }

//   async createNewTemplate() {
//     await this.newFormButton.click();
//     await this.newTemplateButton.click();
//     await this.createNewTemplateButton.click();
//   }
}