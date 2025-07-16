import { Page, Locator, expect } from '@playwright/test';
import { ProductSelectors } from '../selectors/4.ProductPageSelector';
export class ProductPage {
  title: Locator;
  price: Locator;
  quantity: Locator;
  addToCartBtn: Locator;
  miniCartIcon: Locator;

  constructor(private page: Page) {
    this.title = page.locator(ProductSelectors.productTitle);
    this.price = page.locator(ProductSelectors.productPrice);
    this.quantity = page.locator(ProductSelectors.quantityInput);
    this.addToCartBtn = page.locator(ProductSelectors.addToCartBtn);
    this.miniCartIcon = page.locator(ProductSelectors.miniCartIcon);
  }

  async waitForLoad() {
    await expect(this.title).toBeVisible();
  }



  async addToCart() {
    await this.addToCartBtn.click();
    await expect(this.miniCartIcon).toBeVisible();
  }
}
