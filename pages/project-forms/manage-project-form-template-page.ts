import { type Locator, type Page } from '@playwright/test';

export class ManageProjectFormTemplatePage {
  readonly page: Page;
  readonly container: Locator; 

  constructor(page: Page) {
    this.page = page;
    this.container = this.page.locator('manage-project-form-template-page');
  }

}