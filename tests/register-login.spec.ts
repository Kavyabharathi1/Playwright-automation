import { test, expect } from '@playwright/test';
import registerData from '../test-data/registerData.json';
import loginData from '../test-data/loginData.json';
import { ErrorMessages } from '../utils/messages';
import { LoginPage } from '../pages/2.LoginPage';
import { RegisterPage } from '../pages/1.RegisterPage';

// Utility function to prepare unique registration data
function prepareRegister(data: typeof registerData) {
  const suffix = (Math.floor(Math.random() * 9000) + 1000).toString(); // Generates 4-digit random suffix
  const username = (data.username + suffix).slice(0, 15); // Ensures ≤15 characters
  const email = data.email.replace('%SUFFIX%', suffix);

  return { ...data, username, email, suffix };
}

// Utility function to prepare valid login data with suffix
function prepareLogin(data: typeof loginData.valid, suffix: string) {
  const username = data.username.replace('%SUFFIX%', suffix);
  return {
    username,
    password: data.password,
    remember: data.remember,
  };
}

test.use({ browserName: 'chromium' });

test('Register, login (valid & invalid), logout flows', async ({ page }) => {
  const login = new LoginPage(page);
  const register = new RegisterPage(page);

  // 🔹 Prepare registration and login data
  const regData = prepareRegister(registerData);
  const loginValid = prepareLogin(loginData.valid, regData.suffix);
  const loginInvalid = loginData.invalid;

  // 🔹 Register a new user
  await login.goto();
  await login.openLoginForm();
  await login.registerLink.click();
  await register.fillForm(regData);
  await register.submit();
  await login.expectLoggedIn();
  await page.waitForTimeout(5000);

  // 🔹 Logout after registration
  await login.logout();
  await page.waitForTimeout(3000);

  // 🔹 Login with valid credentials
  await login.openLoginForm();
  await login.login(loginValid.username, loginValid.password, loginValid.remember);
  await login.expectLoggedIn();

  // 🔹 Logout again
  await login.logout();
  await page.waitForTimeout(3000);

  // 🔹 Attempt invalid login
  await login.openLoginForm();
  await login.login(loginInvalid.username, loginInvalid.password, loginInvalid.remember);
  await page.waitForTimeout(2000);
  await login.expectError(ErrorMessages.invalidLogin);
});
