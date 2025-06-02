import { type Locator, type Page } from '@playwright/test';
import { error } from 'console';

export class LoginPage {
  readonly page: Page;
  readonly emailAddressInput: Locator;
  readonly continueButton: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailAddressInput = page.getByRole('textbox', { name: 'Email address'});
    this.continueButton = page.getByRole('button', {name: 'Continue'});
    this.passwordInput = page.getByRole('textbox', { name: 'Password'});
    this.loginButton = page.getByRole('button', {name: 'Log in'});
  }

  async goto() {
    if(process.env.BASEURL){
        await this.page.goto(process.env.BASEURL, {timeout: 60000});
    } else {
        throw error('Please set the BASEURL environment variable');
    }
  }

  async login() {
    await this.goto();
    if(process.env.USER_NAME && process.env.PASSWORD) {
        await this.emailAddressInput.fill(process.env.USER_NAME);
        await this.continueButton.click();
        await this.passwordInput.fill(process.env.PASSWORD);
        await this.loginButton.click();
    } else {
        throw error('Please set the USER_NAME and PASSWORD environment variables');
    }
  }
}