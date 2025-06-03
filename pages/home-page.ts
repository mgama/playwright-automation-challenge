import { type Locator, type Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly newProjectButton: Locator;
  readonly generateReportsButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newProjectButton = page.getByRole('button', {name: 'New project'});
    this.generateReportsButton = page.getByRole('button', {name: 'Generate reports'});
  }

  async goto() {
    await this.page.goto(process.env.BASEURL + '/index/projects');
  }

  async goToProject(projectName: string) {
    const projectCardElement = this.page.locator('.project-card').getByText(projectName);
    await projectCardElement.click();
  }
}