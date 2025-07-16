import { Page, Locator, expect } from '@playwright/test';
import { CartSelectors } from '../selectors/5.CartPageSelector';

export class CartPage {
  items: Locator;
  checkoutBtn: Locator;

  constructor(private page: Page) {
    this.items = page.locator(CartSelectors.cartItemName);
    this.checkoutBtn = page.locator(CartSelectors.checkoutBtn);
  }

  async goto() {
    await this.page.goto('https://www.advantageonlineshopping.com/#/shoppingCart');
  }

  async hasProduct(name: string) {
    await expect(this.items.filter({ hasText: name.slice(0, 20) })).toHaveCount(1);

  }

  async clickCheckout() {
    await this.checkoutBtn.click();
  }
}
