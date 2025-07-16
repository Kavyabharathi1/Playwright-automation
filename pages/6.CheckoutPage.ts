import { Page, Locator, expect } from '@playwright/test';
import { CheckoutSelectors } from '../selectors/6.CheckoutPageSelector';

export class CheckoutPage {
  readonly safepayUsername: Locator;
  readonly safepayPassword: Locator;
  readonly nextBtn: Locator;
  readonly payNowBtn: Locator;

  constructor(private page: Page) {
    this.nextBtn = page.locator(CheckoutSelectors.nextBtn);
    this.payNowBtn = page.locator(CheckoutSelectors.payNowBtn);
    this.safepayUsername = page.locator(CheckoutSelectors.safepayUsername);
    this.safepayPassword = page.locator(CheckoutSelectors.safepayPassword);
  }

  async verifyOnCheckoutPage() {
    await expect(this.page).toHaveURL(/.*\/orderPayment/);
  }

  async clickNext() {
   await expect(this.nextBtn).toBeVisible();
    await this.nextBtn.click();
  }

  async enterSafePayCredentials(username: string, password: string) {
    await expect(this.safepayUsername).toBeVisible();
    await this.safepayUsername.fill(username);
    await this.safepayPassword.fill(password);
  }

  async clickPayNow() {
    await expect(this.payNowBtn).toBeVisible();
    await this.payNowBtn.click();
  }
}
