# 🛒 Advantage Online Shopping – Playwright E2E Test Suite

Automated end-to-end tests using **Playwright** and **TypeScript**, designed to validate critical user flows on the [Advantage Online Shopping](https://www.advantageonlineshopping.com) demo site.

---

## 🛠️ Prerequisites

- **Node.js** LTS (v20+ recommended)  
- **npm** (bundled with Node.js)  
- **Playwright** (Chromium browser support)  
- **VS Code** (recommended for TypeScript support)  

---

## ⚙️ Project Setup

1. **Clone the repository**  
   git clone <your-repo-url>
   cd <your-repo-folder>


2. **Install dependencies and browsers**
   npm install
   npx playwright install chromium


3. **Verify JSON fixtures**

   * `test-data/credentials.json`

     ```json
     {
       "username": "existingUser",
       "password": "Test@1234",
       "remember": true
     }
     ```
   * `test-data/productData.json`

     ```json
     {
       "product": {
         "category": "SPEAKERS",
         "name": "Bose Soundlink Bluetooth Speaker III",
         "quantity": 2
       }
     }
     ```

---

## ▶️ Running the Tests

* **Run all tests**: npx playwright test
  
* **Run a specific test** : npx playwright test src/tests/checkout.spec.ts
 
* **Run in headed mode** (see the browser UI): npx playwright test --headed

* **Generate or view the HTML report**:  npx playwright show-report


---

## 📂 Directory Overview

```
.
├── src/
│   ├── pages/                  # Page Object Model classes
│   │   ├── 1.RegisterPage.ts
│   │   ├── 2.LoginPage.ts
│   │   ├── 3.HomePage.ts
│   │   ├── 4.ProductPage.ts
│   │   ├── 5.CartPage.ts
│   │   ├── 6.CheckoutPage.ts
│   │   └── 7.OrderConfirmationPage.ts
│   ├── selectors/
│   │   └── productSelectors.ts
│   └── utils/
│       └── credentialUtils.ts
├── src/tests/                  # Test specification files
│   ├── registerLogin.spec.ts
│   └── checkout.spec.ts
├── test-data/                  # External test fixtures
│   ├── registerData.json
│   ├── loginData.json
│   ├── credentials.json
│   └── productData.json
├── playwright.config.ts
├── tsconfig.json
└── package.json
```

---

## 🧪 Covered Test Scenarios

### 1. ✅ Registration & Login

* Generates a unique user with randomized suffix
* Validates login, logout, and invalid login behavior

### 2. 🛍️ Add to Cart & Checkout

| Flow                   | Description                                                                                         |
| ---------------------- | --------------------------------------------------------------------------------------------------- |
| **Flow A – Guest**     | Selects product → adds to cart → checkout redirects to login → SafePay payment → order confirmation |
| **Flow B – Logged-in** | Pre-login → selects product → direct checkout → SafePay payment → order confirmation                |

---

## 🛡️ Architecture Highlights

* **Page Object Model** (`src/pages/`) encapsulates UI interactions
* **Selectors centralized** in `selectors/productSelectors.ts`
* **Data-driven tests** using JSON fixtures
* **Credentials reused** across flows
* **Modular design** promotes maintainability and clarity

---

## 🔧 Debugging Tips

* **Debug mode**:  npx playwright test --debug

* **Trace on failure**:  npx playwright test --trace on
  npx playwright show-report

* Update selectors in `productSelectors.ts` if UI updates break tests

---

## 🚀 Next Steps & CI

* Add new scenarios—e.g., remove from cart, credit-card payment
* Integrate CI via GitHub Actions
* Enhance reports with Allure or similar tools

---

## ✨ Resources

* Official Playwright TypeScript docs
* Best practices: data-driven testing & modular POM architecture

---

## 👤 Author

Developed by **Kavya Bharathi**, July 2025

```

