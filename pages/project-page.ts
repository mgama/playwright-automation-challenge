import { type Locator, type Page } from '@playwright/test';

export class ProjectPage {
  readonly page: Page;
  readonly newPlanButton: Locator;
  readonly newFolderButton: Locator;
  readonly fieldManamementSection: Locator;
  readonly fieldManagementPlans: Locator;
  readonly fieldManagementTasks: Locator;
  readonly fieldManagementForms: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newPlanButton = this.page.getByRole('button', {name: 'New plan'});
    this.newFolderButton = this.page.getByRole('button', {name: 'New folder'});
    this.fieldManamementSection = this.page.getByTestId('field-management-section');
    this.fieldManagementPlans = this.page.getByRole('link', { name: 'Plans'});
    this.fieldManagementTasks = this.page.getByRole('link', { name: 'Tasks'});
    this.fieldManagementForms = this.page.getByRole('link', { name: 'Forms'});
  }

}