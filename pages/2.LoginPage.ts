import { Page, Locator, expect } from '@playwright/test';
import { LoginSelectors } from '../selectors/1.loginSelectors';

export class LoginPage {
  readonly page: Page;
  readonly userIcon: Locator;
  readonly username: Locator;
  readonly password: Locator;
  readonly rememberMe: Locator;
  readonly signIn: Locator;
  readonly registerLink: Locator;
  readonly error: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userIcon = page.locator(LoginSelectors.userIcon);
    this.username = page.locator(LoginSelectors.usernameInput);
    this.password = page.locator(LoginSelectors.passwordInput);
    this.rememberMe = page.locator(LoginSelectors.rememberMeCheckbox);
    this.signIn = page.locator(LoginSelectors.signInBtn);
    this.registerLink = page.locator(LoginSelectors.registerLink);
    this.error = this.page.locator('#signInResultMessage');
    this.logoutLink = page.locator(LoginSelectors.logoutLink);
  }

  async goto() {
    await this.page.goto(LoginSelectors.visitUrl);
  }

  async openLoginForm() {
    await this.userIcon.click();
  }

  async login(username: string, pass: string, remember = false) {
    await this.username.fill(username);
    await this.password.fill(pass);
    if (remember) await this.rememberMe.check();
   
    await this.signIn.click();
  }

  async expectError(expectedText?: string) {
    await this.error.waitFor({ state: 'visible', timeout: 10_000 });
    await expect(this.error).toBeVisible();
    if (expectedText) {
      await expect(this.error).toContainText(expectedText);
    }
  }

   async logout() {
    await this.page.getByRole('link', { name: 'UserMenu' }).click();
await this.page.getByRole('link', { name: 'Sign out' }).click();

  
}
async expectLoggedIn() {
    await expect(this.page.locator('#menuUserLink')).toBeVisible();
  }


}
