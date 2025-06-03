import { expect, type Locator, type Page } from '@playwright/test';

export class ProjectTasksPage {
  readonly page: Page;
  readonly newFormButton: Locator; 
  readonly actionsDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newFormButton = this.page.getByRole('button', {name: 'New form'});
    this.actionsDropdown = this.page.locator('[data-e2e="forms-actions-dropdown-btn"]');
  }
}