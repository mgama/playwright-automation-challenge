import { type Locator, type Page } from '@playwright/test';

export class PreviewTemplateModal {
  readonly page: Page;
  readonly container: Locator;
  readonly closeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.container = this.page.locator('.fw-form-edit-modal.form-edit-modal-container');
    this.closeButton = this.container.locator('.fw-icon-close');
  }

}