import { type Locator, type Page } from '@playwright/test';
import { CreateFormTemplateModal } from './components/create-form-template-modal';

export class ProjectFormsPage {
  readonly page: Page;
  readonly newFormButton: Locator; 
  readonly actionsDropdown: Locator;
  readonly newTemplateButton: Locator;
  readonly createNewTemplateButton: Locator;
  readonly createFormTemplateModal: CreateFormTemplateModal;
  readonly templatesTable: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newFormButton = this.page.getByRole('button', {name: 'New form'});
    this.actionsDropdown = this.page.getByTestId('forms-actions-dropdown-btn');
    this.newTemplateButton = this.page.getByTestId('new-form-dropdown-new-template-btn');
    this.createNewTemplateButton = this.page.locator('create-new-template-button');
    this.createFormTemplateModal = new CreateFormTemplateModal(page);
    this.templatesTable = this.page.locator('.templates-table');
  }

  async createNewTemplate() {
    await this.newFormButton.click();
    await this.newTemplateButton.click();
    await this.createNewTemplateButton.click();
  }

  async searchTemplateInTemplateTable(templateName: string) {
    return this.templatesTable.getByText(templateName);
  }
}