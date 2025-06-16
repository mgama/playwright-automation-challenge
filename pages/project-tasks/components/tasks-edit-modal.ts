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
  readonly attachmentsButton: Locator;
  readonly attachmentsFormOption: Locator;
  readonly existingFormOption: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.modal = this.page.getByTestId('task-view-edit-modal');
    this.editTaskName = this.page.getByTestId('task-edit-name');
    this.editTaskNameInput = this.modal.locator('.edit-task-name-input');
    this.editTaskNameCheckButton = this.modal.getByTestId('task-edit-check');
    this.editTaskNameCancelButton = this.modal.getByTestId('task-edit-cancel-btn');
    this.taskStatusDropdown = new TasksStatusDropdown(page);
    this.closeModalButton = this.modal.getByTestId('task-edit-dismiss');
    this.attachmentsButton = this.modal.getByTestId('task-edit-attachments-btn');
    this.attachmentsFormOption = this.modal.locator('.add-forms');
    this.existingFormOption = this.modal.locator('.add-form').filter({hasText: 'Existing form'});
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
