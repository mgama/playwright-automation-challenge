import { type Locator, type Page } from '@playwright/test';

export class CreateFormTemplateModal {
  readonly page: Page;
  readonly modal: Locator; 
  readonly createButton: Locator;
  readonly templateNameInput: Locator;
  readonly templateSelectionDropdown: Locator;
  readonly blankTemplateOption: Locator;
  readonly uploadExistingPdfFormOption: Locator;

  constructor(page: Page) {
    this.page = page;
    this.modal = this.page.locator('.create-new-form-template-modal');
    this.createButton = this.modal.getByRole('button', {name: 'Create'});
    this.templateNameInput = this.modal.locator('[data-e2e="create-form-template-modal-name-input"]');
    this.templateSelectionDropdown = this.modal.locator('[data-e2e="create-form-template-modal-template-selection-dropdown"]');
    this.blankTemplateOption = this.modal.locator('[data-e2e="create-form-template-modal-new-blank-template-button"]');
    this.uploadExistingPdfFormOption = this.page.locator('[data-e2e="create-new-project-modal-clone-existing-project-btn"]');
  }

  async createNewTemplate(templateName: string, templateOption: string) {
    await this.selectTemplateOnDropdown(templateOption);
    await this.templateNameInput.fill(templateName);
    await this.createButton.click();
  }

  async selectTemplateOnDropdown(templateOption: string) {
    await this.templateSelectionDropdown.click();

    switch(templateOption) {
        case 'Blank Template':
            await this.blankTemplateOption.click();
            break;
        case 'Upload existing PDF form':
            await this.uploadExistingPdfFormOption.click();
            break
        default:
            await this.blankTemplateOption.click();
            break;
    }
  }
}