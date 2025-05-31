import { expect, type Locator, type Page } from '@playwright/test';

export class ProjectTasksPage {
  readonly page: Page;
  readonly dueTodayNewTask: Locator;
  readonly priorityOneNewTask: Locator;
  readonly priorityTwoNewTask: Locator;
  readonly priorityThreeNewTask: Locator;
  readonly completedNewTask: Locator;
  readonly verifiedNewTask: Locator;
  readonly newTaskTitleInput: Locator;
  readonly newTaskSubmitButton: Locator;
  readonly newTaskCancelButton: Locator;
  readonly actionsDropdown: Locator;
  readonly deleteAction: Locator;
  readonly modalDeleteButton: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.priorityOneNewTask = page.locator('fw-task-column').filter({ hasText: 'Priority 1' }).getByText('+ New task');
    this.priorityTwoNewTask = page.locator('fw-task-column').filter({ hasText: 'Priority 2' }).getByText('+ New task');
    this.priorityThreeNewTask = page.locator('fw-task-column').filter({ hasText: 'Priority 3' }).getByText('+ New task');
    this.dueTodayNewTask = page.locator('fw-task-column').filter({ hasText: 'Due Today' }).getByText('+ New task');
    this.completedNewTask = page.locator('fw-task-column').filter({ hasText: 'Completed' }).getByText('+ New task');
    this.verifiedNewTask = page.locator('fw-task-column').filter({ hasText: 'Verified' }).getByText('+ New task');
    this.newTaskTitleInput = page.getByRole('textbox', {name: "Enter title"});
    this.newTaskSubmitButton = page.getByRole('button', {name: "Submit"});
    this.newTaskCancelButton = page.getByRole('button', {name: "Cancel"});
    this.actionsDropdown = page.locator('[data-e2e="tasks-page-actions-dropdown"]');
    this.deleteAction = page.locator('[data-e2e="tasks-page-action-dropdown-delete"]');
    this.modalDeleteButton = page.locator('.modal-footer').getByRole('button', {name: "Delete"});
  }

  async findTaskByTitle(taskTitle: string) {
    return await this.page.locator('.task-item-holder').getByText(taskTitle);
  }

  async selectTaskByTitle(taskTitle: string) {
    await this.page.locator('[data-e2e="task-item-checkbox-' + taskTitle + '"]').click({force: true});
  }

  async deleteTaskByTitle(taskTitle: string) {
    await this.selectTaskByTitle(taskTitle);
    await this.actionsDropdown.click();
    await this.deleteAction.click();
    await expect(this.modalDeleteButton).toBeVisible();
    await this.modalDeleteButton.click();
  }
}