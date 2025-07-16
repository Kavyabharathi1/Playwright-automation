import { Page, Locator, expect } from '@playwright/test';
import { CheckoutSelectors } from '../selectors/6.CheckoutPageSelector';

export class OrderConfirmationPage {
  readonly confirmationMsg: Locator;
  readonly orderNumber: Locator;

  constructor(private page: Page) {
    this.confirmationMsg = page.locator(CheckoutSelectors.confirmationMessage);
    this.orderNumber = page.locator(CheckoutSelectors.orderNumber);
  }

  async expectOrderSuccess() {
    await expect(this.confirmationMsg).toBeVisible();
    
  }
}
