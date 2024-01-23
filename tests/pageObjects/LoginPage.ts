import { BasePage } from "./BasePage";
import { Page, Locator, expect } from "@playwright/test";
export class LoginPage extends BasePage {
  readonly signInBtn: Locator;
  readonly signinError: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly rememberMe: Locator;
  readonly signupBtn: Locator;

  constructor(page: Page, browserName) {
    super(page,browserName);
    this.signInBtn = page.locator(`[data-test=signin-submit]`);
    this.signinError = page.locator(`[data-test=signin-error]`);
    this.usernameInput = page.locator(`[data-test=signin-username] input`);
    this.passwordInput = page.locator(`[data-test=signin-password] input`);
    this.rememberMe = page.locator(`[data-test=signin-remember-me]`);
    this.signupBtn = page.locator("[data-test=signup]");
  }

  login = async (
    username: string,
    password: string,
    { rememberUser = false } = {}
  ): Promise<void> => {
    const signinPath = "/signin";
    const loginUser = this.page.waitForRequest((request) => request.url().includes("/login"));
    let currentUrl = this.page.url();
    if (!currentUrl.includes(signinPath)) {
      await this.page.goto(signinPath);
    }
    await expect(this.usernameInput).toBeVisible();
    await this.usernameInput.click();
    await this.usernameInput.fill(username);
    await expect(this.passwordInput).toBeVisible();
    await this.passwordInput.click();
    await this.passwordInput.fill(password);
    if (rememberUser) {
      await this.rememberMe.check();
      await expect(this.rememberMe).toBeChecked();
    }
    await this.signInBtn.click();
    await loginUser;
  };

  clickSignUpBtn = async () => {
    await this.clickButton(this.signupBtn);
  };
}
