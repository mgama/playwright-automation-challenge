import { expect, type Locator, type Page } from '@playwright/test';

export class ProjectPage {
  readonly page: Page;
  readonly newPlanButton: Locator;
  readonly newFolderButton: Locator;
  readonly fieldManamementSection: Locator;
  readonly fieldManagementPlans: Locator;
  readonly fieldManagementTasks: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newPlanButton = page.getByRole('button', {name: 'New plan'});
    this.newFolderButton = page.getByRole('button', {name: 'New folder'});
    this.fieldManamementSection = page.locator("[data-e2e='field-management-section']");
    this.fieldManagementPlans = page.getByRole('link', { name: 'Plans'});
    this.fieldManagementTasks = page.getByRole('link', { name: 'Tasks'});
  }

}