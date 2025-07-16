import { test, expect } from '@playwright/test';

import productData from '../test-data/productData.json';
import creds from '../test-data/credentials.json';
import { LoginPage } from '../pages/2.LoginPage';
import { HomePage } from '../pages/3.HomePage';
import { ProductPage } from '../pages/4.ProductPage';
import { CartPage } from '../pages/5.CartPage';
import { CheckoutPage } from '../pages/6.CheckoutPage';
import { OrderConfirmationPage } from '../pages/7.OrderConfirmationPage';

test.describe('🛒 Task 2: Add to Cart & Checkout Flows', () => {
  const { category, name } = productData.product;

  test('Flow A: Guest → Add to Cart → Login at Checkout → Complete Order', async ({ page }) => {
    const home = new HomePage(page);
    const product = new ProductPage(page);
    const cart = new CartPage(page);
    const login = new LoginPage(page);
    const checkout = new CheckoutPage(page);
    const confirm = new OrderConfirmationPage(page);

    // 🔹 Navigate to Home and select product
    await home.goto();
    await home.selectCategory(category);
    await home.openProductByName(name);

    // 🔹 Add product to cart
    await product.waitForLoad();
    await product.addToCart();

    // 🔹 Proceed to checkout, trigger login as guest
    await cart.goto();
    await cart.clickCheckout();

    // 🔹 Login flow
    await login.openLoginForm();
    await login.login(creds.username, creds.password, creds.remember);
    await login.expectLoggedIn();

    // 🔹 Continue checkout after login
    await cart.goto();
    await cart.clickCheckout();
    await checkout.verifyOnCheckoutPage();
    await checkout.clickNext(); // proceed from shipping/review

    // 🔹 Enter SafePay credentials and pay
    await checkout.enterSafePayCredentials(creds.username, creds.password);
    await checkout.clickPayNow();

    // 🔹 Validate order success
    await confirm.expectOrderSuccess();
  });

  test.describe('Flow B: Logged-in → Add to Cart → Direct Checkout', () => {
    test.beforeEach(async ({ page }) => {
      const login = new LoginPage(page);
      await login.goto();
      await login.openLoginForm();
      await login.login(creds.username, creds.password, creds.remember);
      await login.expectLoggedIn();
    });

    test('should add product to cart and checkout directly', async ({ page }) => {
      const home = new HomePage(page);
      const product = new ProductPage(page);
      const cart = new CartPage(page);
      const checkout = new CheckoutPage(page);
      const confirm = new OrderConfirmationPage(page);

      // 🔹 Select product category and item
      await home.selectCategory(category);
      await home.openProductByName(name);

      // 🔹 Add to cart
      await product.waitForLoad();
      await product.addToCart();

      // 🔹 Proceed to checkout directly
      await cart.goto();
      await cart.clickCheckout();
      await checkout.verifyOnCheckoutPage();
      await checkout.clickNext(); // proceed from shipping/review

      // 🔹 Complete payment
      await checkout.enterSafePayCredentials(creds.username, creds.password);
      await checkout.clickPayNow();

      // 🔹 Validate order success
      await confirm.expectOrderSuccess();
    });
  });
});
