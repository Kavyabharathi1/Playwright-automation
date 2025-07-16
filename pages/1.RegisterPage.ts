import { Page, Locator, expect } from '@playwright/test';
import { RegisterSelectors } from '../selectors/2.registerSelectors';

export class RegisterPage {
  readonly page: Page;
  readonly username: Locator;
  readonly email: Locator;
  readonly password: Locator;
  readonly confirmPassword: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly phone: Locator;
  readonly country: Locator;
  readonly city: Locator;
  readonly address: Locator;
  readonly state: Locator;
  readonly postal: Locator;
  readonly offers: Locator;
  readonly agree: Locator;
  readonly submitBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.locator(RegisterSelectors.username);
    this.email = page.locator(RegisterSelectors.email);
    this.password = page.locator(RegisterSelectors.password);
    this.confirmPassword = page.locator(RegisterSelectors.confirmPassword);
    this.firstName = page.locator(RegisterSelectors.firstName);
    this.lastName = page.locator(RegisterSelectors.lastName);
    this.phone = page.locator(RegisterSelectors.phone);
    this.country = page.locator(RegisterSelectors.country);
    this.city = page.locator(RegisterSelectors.city);
    this.address = page.locator(RegisterSelectors.address);
    this.state = page.locator(RegisterSelectors.state);
    this.postal = page.locator(RegisterSelectors.postalCode);
    this.offers = page.locator(RegisterSelectors.offersCheckbox);
    this.agree = page.locator(RegisterSelectors.agreeCheckbox);
    this.submitBtn = page.locator(RegisterSelectors.registerBtn);
  }

  async fillForm(data: {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
    country: string;
    city: string;
    address: string;
    state: string;
    postalCode: string;
    offers?: boolean;
  }) {
    await this.username.fill(data.username);
    await this.email.fill(data.email);
    await this.password.fill(data.password);
    await this.confirmPassword.fill(data.password);
    await this.firstName.fill(data.firstName);
    await this.lastName.fill(data.lastName);
    await this.phone.fill(data.phone);
    await this.country.selectOption({ label: data.country });
    await this.city.fill(data.city);
    await this.address.fill(data.address);
    await this.state.fill(data.state);
    await this.postal.fill(data.postalCode);
    if (data.offers) await this.offers.check();
    await this.agree.check();
  }

  async submit() {
    await this.submitBtn.click();
  }
async register(data: Parameters<this['fillForm']>[0]) {
    await this.fillForm(data);
    await this.submit();
    await expect(this.page.locator('#menuUserLink')).toBeVisible();
  }
  
}
