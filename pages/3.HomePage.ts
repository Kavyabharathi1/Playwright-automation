import { Page, Locator, expect } from '@playwright/test';
import { ProductSelectors } from '../selectors/4.ProductPageSelector';

export class HomePage {
  categories: Locator;
  products: Locator;

  constructor(private page: Page) {
    this.categories = page.locator(ProductSelectors.categoryItem);
    this.products = page.locator(ProductSelectors.productCard);
  }

  async goto() {
    await this.page.goto('https://www.advantageonlineshopping.com/');
  }

  async selectCategory(name: string) {
    await this.categories.filter({ hasText: name }).first().click();
    await expect(this.products.first()).toBeVisible();
  }

  async openProductByName(name: string) {
    await this.products.filter({ hasText: name }).first().click();
  }
}
