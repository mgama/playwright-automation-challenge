import { type Locator, type Page } from '@playwright/test';

export class FindExistingFormModal {
  readonly page: Page;
  readonly modal: Locator;
  readonly searchInputField: Locator;
  readonly attachFormButton: Locator;
  
  
  constructor(page: Page) {
    this.page = page;
    this.modal = this.page.getByTestId('task-view-edit-modal');
    this.searchInputField = this.page.getByRole('textbox', {name: 'Search'});
    this.attachFormButton = this.page.getByTestId('existing-form-modal-attach-btn');
  }

  async findForm(formName: string){
    await this.searchInputField.click();
    await this.searchInputField.fill(formName);
    const dropdown = this.page.getByRole('option', {name: formName});
    await dropdown.click();
    await this.attachFormButton.click();
  }
}