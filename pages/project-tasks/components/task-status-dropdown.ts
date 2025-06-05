import { type Locator, type Page } from '@playwright/test';

export class TasksStatusDropdown {
  readonly page: Page;
    priorityOneOption: Locator;
    priorityTwoOption: Locator;
    priorityThreeOption: Locator;
    completedOption: Locator;
    verifiedOption: Locator;
    deleteTaskOption: Locator;
    statusLabel: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.statusLabel = this.page.locator('.status-label');
    this.priorityOneOption = this.page.locator('[data-e2e="task-status-choice-Priority 1-dropdown-btn"]');
    this.priorityTwoOption = this.page.locator('[data-e2e="task-status-choice-Priority 2-dropdown-btn"]');
    this.priorityThreeOption = this.page.locator('[data-e2e="task-status-choice-Priority 3-dropdown-btn"]');
    this.completedOption = this.page.locator('[data-e2e="task-status-choice-Completed-dropdown-btn"]');
    this.verifiedOption = this.page.locator('[data-e2e="task-status-choice-Verified-dropdown-btn"]');
    this.deleteTaskOption = this.page.getByText('Delete task');
  }

  async selectStatus(status: string) {
    await this.statusLabel.click();
    switch(status){
        case 'Priority 1':
            await this.priorityOneOption.click();
            break;
        case 'Priority 2':
            await this.priorityTwoOption.click();
            break;
        case 'Priority 3':
            await this.priorityThreeOption.click();
            break;   
        case 'Completed':
            await this.completedOption.click();
            break;
        case 'Verified':
            await this.verifiedOption.click();
            break;
        case 'Delete Task':
            await this.deleteTaskOption.click();
            break;
        default:
            break;
    }
  }
}

