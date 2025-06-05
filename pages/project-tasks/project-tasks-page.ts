import { expect, type Locator, type Page } from '@playwright/test';
import { TasksEditModal } from './components/tasks-edit-modal';

export class ProjectTasksPage {
  readonly page: Page;
  readonly dueTodayNewTask: Locator;
  readonly priorityOneTaskColumn: Locator;
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
  readonly newTaskHeaderButton: Locator;
  readonly tasksEditModal: TasksEditModal;
  readonly dueTodayTaskColumn: Locator;
  readonly priorityTwoTaskColumn: Locator;
  readonly priorityThreeTaskColumn: Locator;
  readonly completedTaskColumn: Locator;
  readonly verifiedTaskColumn: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.dueTodayTaskColumn = this.page.locator('fw-task-column').filter({ hasText: 'Due Today' });
    this.priorityOneTaskColumn = this.page.locator('fw-task-column').filter({ hasText: 'Priority 1' });
    this.priorityTwoTaskColumn = this.page.locator('fw-task-column').filter({ hasText: 'Priority 2' });
    this.priorityThreeTaskColumn = this.page.locator('fw-task-column').filter({ hasText: 'Priority 3' });
    this.completedTaskColumn = this.page.locator('fw-task-column').filter({ hasText: 'Completed' });
    this.verifiedTaskColumn = this.page.locator('fw-task-column').filter({ hasText: 'Verified' });

    this.priorityOneNewTask = this.priorityOneTaskColumn.getByText('+ New task');
    this.priorityTwoNewTask = this.priorityTwoTaskColumn.getByText('+ New task');
    this.priorityThreeNewTask = this.priorityThreeTaskColumn.getByText('+ New task');
    this.dueTodayNewTask = this.dueTodayTaskColumn.getByText('+ New task');
    this.completedNewTask = this.completedTaskColumn.getByText('+ New task');
    this.verifiedNewTask = this.verifiedTaskColumn.getByText('+ New task');

    this.newTaskTitleInput = this.page.getByRole('textbox', {name: "Enter title"});
    this.newTaskSubmitButton = this.page.getByRole('button', {name: "Submit"});
    this.newTaskCancelButton = this.page.getByRole('button', {name: "Cancel"});
    this.actionsDropdown = this.page.getByTestId('tasks-page-actions-dropdown');
    this.deleteAction = this.page.getByTestId('tasks-page-action-dropdown-delete');
    this.modalDeleteButton = this.page.locator('.modal-footer').getByRole('button', {name: "Delete"});
    this.newTaskHeaderButton = this.page.getByTestId('create-new-task').getByRole('button', {name: 'New task'});
    this.tasksEditModal = new TasksEditModal(page);
  }

  async findTaskByTitle(taskTitle: string) {
    return await this.page.locator('.task-item-holder').getByText(taskTitle);
  }

  async findTaskByTitleAndColumn(taskTitle: string, taskColumn: string) {
    let columnLocator; 
    switch(taskColumn) {
      case 'Due Today':
        columnLocator = this.dueTodayTaskColumn;
        break;
      case 'Priority 1':
        columnLocator = this.priorityOneTaskColumn;
        break;
      case 'Priority 2':
        columnLocator = this.priorityTwoTaskColumn;
        break;
      case 'Priority 3':
        columnLocator = this.priorityThreeTaskColumn;
        break;
      case 'Completed':
        columnLocator = this.completedTaskColumn;
        break;
      case 'Verified':
        columnLocator = this.verifiedTaskColumn;
        break;
    }
    return await columnLocator.getByText(taskTitle);
  }

  async selectTaskByTitle(taskTitle: string) {
    await this.page.getByTestId('task-item-checkbox-' + taskTitle + '"]').click({force: true});
  }

  async deleteTaskByTitle(taskTitle: string) {
    await this.selectTaskByTitle(taskTitle);
    await this.actionsDropdown.click();
    await this.deleteAction.click();
    await expect(this.modalDeleteButton).toBeVisible();
    await this.modalDeleteButton.click();
  }
}