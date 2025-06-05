import { type Locator, type Page } from '@playwright/test';
import { TasksStatusDropdown } from './task-status-dropdown';

export type task = {
    name: string,
    status: string,
    category?: string, 
    assignee?: string, 
    plan?: string,
    location?: string,
    startDate?: string,
    endDate?: string,
    manPower?: string,
    cost?: string,
    tags?: string,
    watchers?: string,
}

export class TasksEditModal {
  readonly page: Page;
  readonly modal: Locator;
  readonly editTaskName: Locator;
  readonly editTaskNameInput: Locator;
  readonly editTaskNameCheckButton: Locator;
  readonly editTaskNameCancelButton: Locator;
  readonly taskStatusDropdown: TasksStatusDropdown;
  readonly closeModalButton: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.modal = page.locator('[data-e2e="task-view-edit-modal"]');
    this.editTaskName = page.locator('[data-e2e="task-edit-name"]');
    this.editTaskNameInput = this.modal.locator('.edit-task-name-input');
    this.editTaskNameCheckButton = this.modal.locator('[data-e2e="task-edit-check"]');
    this.editTaskNameCancelButton = this.modal.locator('[data-e2e="task-edit-cancel-btn"]');
    this.taskStatusDropdown = new TasksStatusDropdown(page);
    this.closeModalButton = this.modal.locator('[data-e2e="task-edit-dismiss"]');
  }

  async createTask(taskProperties: task){
    if(taskProperties.name) {
      await this.editTaskName.click();
      await this.editTaskNameInput.fill(taskProperties.name);
      await this.editTaskNameCheckButton.click();
    }
    if(taskProperties.status) {
      await this.taskStatusDropdown.selectStatus(taskProperties.status);
    }
  }
}
