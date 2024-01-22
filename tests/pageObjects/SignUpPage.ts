import { BasePage } from "./BasePage";
import { Page, Locator, expect } from "@playwright/test";

export class SignUpPage extends BasePage {
  readonly signup_title: Locator;
  readonly signup_first_name_field: Locator;
  readonly firstNameHelperText: Locator;
  readonly signup_last_name_field: Locator;
  readonly lastNameHelperText: Locator;
  readonly signup_username_field: Locator;
  readonly usernameHelperText: Locator;
  readonly signup_password_field: Locator;
  readonly passwordHelperText: Locator;
  readonly signup_confirmPassword_field: Locator;
  readonly confirmPasswordHelperText: Locator;
  readonly signup_submit_btn: Locator;

  constructor(page: Page) {
    super(page);
    this.signup_title = page.locator(`[data-test=signup-title]`);
    this.signup_first_name_field = page.locator(`[data-test=signup-first-name] input`);
    this.firstNameHelperText = page.locator(`#firstName-helper-text`);
    this.signup_last_name_field = page.locator(`[data-test=signup-last-name] input`);
    this.lastNameHelperText = page.locator(`#lastName-helper-text`);
    this.signup_username_field = page.locator(`[data-test=signup-username] input`);
    this.usernameHelperText = page.locator(`#username-helper-text`);
    this.signup_password_field = page.locator(`[data-test=signup-password] input`);
    this.passwordHelperText = page.locator(`#password-helper-text`);
    this.signup_confirmPassword_field = page.locator(`[data-test=signup-confirmPassword] input`);
    this.confirmPasswordHelperText = page.locator(`#confirmPassword-helper-text`);
    this.signup_submit_btn = page.locator(`[data-test=signup-submit]`);
  }

  typeFirstName = async (firstName: string) => {
    await this.typeInField(this.signup_first_name_field, firstName);
  };

  typeLastName = async (lastName: string) => {
    await this.typeInField(this.signup_last_name_field, lastName);
  };

  typeUsername = async (username: string) => {
    await this.typeInField(this.signup_username_field, username);
  };

  typePassword = async (password: string) => {
    await this.typeInField(this.signup_password_field, password);
  };

  typeConfirmPassword = async (confirmPassword: string) => {
    await this.typeInField(this.signup_confirmPassword_field, confirmPassword);
  };

  clickSignUpSubmitBtn = async () => {
    await this.clickButton(this.signup_submit_btn);
  };
}
