import { LoginPage, SignUpPage, MainPage, OnboardingPopUpPage } from "../pageObjects/index.ts";
import { test, expect, type Page } from "@playwright/test";
import { User } from "../../src/models/index.ts";

let loginPage: LoginPage;
let signUpPage: SignUpPage;
let mainPage: MainPage;
let onboardingPopUpPage: OnboardingPopUpPage;

test.describe("User Sign-up and Login", () => {
  test.beforeEach(async ({ page, browserName}) => {
    loginPage = new LoginPage(page,browserName);
    await loginPage.db_seed();
  });

  test("should redirect unauthenticated user to sign-in page", async ({ page }) => {
    await page.goto("/personal");
    await page.waitForURL("**/signin");
    await loginPage.visualSnapshot("Redirect to SignIn");
  });

  test("should redirect to the home page after login", async ({ page }) => {
    let user: User = await loginPage.database("find", "users");
    await loginPage.login(user.username, "s3cret", { rememberUser: true });
    await expect(page).toHaveURL("/");
  });

  test("should remember a user for 30 days after login", async ({ page, browserName }) => {
    let user: User = await loginPage.database("find", "users");
    await loginPage.login(user.username, "s3cret", { rememberUser: true });
    let listBankAccountGQL = loginPage.waitForGraphQLRequest("listBankAccount");
    await listBankAccountGQL;
    // Verify Session Cookie
    const cookies = await page.context().cookies();
    await expect(cookies).toHaveProperty("[0].expires");
    // Logout User
    mainPage = new MainPage(page,browserName);
    await mainPage.clickLogOutBtn();
    await expect(page).toHaveURL("/signin");
    await loginPage.visualSnapshot("Redirect to SignIn");
  });

  test("should allow a visitor to sign-up, login, and logOut", async ({ page,browserName }) => {
    const userInfo = {
      firstName: "Bob",
      lastName: "Ross",
      username: "PainterJoy90",
      password: "s3cret",
    };
    // Sign-up User
    await page.goto("/");
    await page.waitForURL("**/signin");
    await loginPage.clearField(loginPage.usernameInput);
    await loginPage.clickSignUpBtn();
    signUpPage = new SignUpPage(page,browserName);
    await signUpPage.verifyTextAtPageBySelector(signUpPage.signup_title, "Sign Up");
    await signUpPage.visualSnapshot("Sign Up Title");
    await signUpPage.typeFirstName(userInfo.firstName);
    await signUpPage.typeLastName(userInfo.lastName);
    await signUpPage.typeUsername(userInfo.username);
    await signUpPage.typePassword(userInfo.password);
    await signUpPage.typeConfirmPassword(userInfo.password);

    await signUpPage.visualSnapshot("About to Sign Up");
    const waitForSignUpRequest = page.waitForRequest((request) => {
      return request.url().includes("/users");
    });
    await signUpPage.clickSignUpSubmitBtn();
    await waitForSignUpRequest;
    // Login User
    let listBankAccountGQL = loginPage.waitForGraphQLRequest("listBankAccount");
    await loginPage.login(userInfo.username, userInfo.password);
    await listBankAccountGQL;
    // Onboarding
    mainPage = new MainPage(page,browserName);
    onboardingPopUpPage = new OnboardingPopUpPage(page,browserName);
    await expect(mainPage.user_onboarding_dialog).toBeVisible();
    await expect(mainPage.list_skeleton).toHaveCount(0);
    await expect(mainPage.navTopNotificationsCount).toHaveCount(1);
    await signUpPage.visualSnapshot("User Onboarding Dialog");
    await onboardingPopUpPage.clickNextOnOnboarding();
    await expect(onboardingPopUpPage.userOnboardingDialogTitle).toHaveText("Create Bank Account");
    await onboardingPopUpPage.typeBankName("The Best Bank");
    await onboardingPopUpPage.typeAccountNumber("123456789");
    await onboardingPopUpPage.typeRoutingNumber("987654321");
    await onboardingPopUpPage.visualSnapshot("About to complete User Onboarding");
    let gqlCreateBankAccountMutation = loginPage.waitForGraphQLRequest("createBankAccount");
    await onboardingPopUpPage.clickSaveOnOnboarding();
    await gqlCreateBankAccountMutation;
    await expect(onboardingPopUpPage.userOnboardingDialogTitle).toHaveText("Finished");
    await expect(onboardingPopUpPage.userOnboardingDialogContent).toContainText("You're all set!");
    await onboardingPopUpPage.visualSnapshot("Finished User Onboarding");
    await onboardingPopUpPage.clickNextOnOnboarding();
    await expect(mainPage.transactionList).toBeVisible();
    await mainPage.visualSnapshot("Transaction List is visible after User Onboarding");
    // Logout User
    await mainPage.clickLogOutBtn();
    await expect(page).toHaveURL("/signin");
    await mainPage.visualSnapshot("Redirect to SignIn");
  });

  test("should display signup errors", async ({ page,browserName }) => {
    await page.goto("/signup");
    signUpPage = new SignUpPage(page,browserName);
    await signUpPage.typeFirstName("First");
    await signUpPage.clearField(signUpPage.signup_first_name_field);
    await signUpPage.verifyTextAtPageBySelector(
      signUpPage.firstNameHelperText,
      "First Name is required"
    );
    await signUpPage.typeLastName("Last");
    await signUpPage.clearField(signUpPage.signup_last_name_field);
    await signUpPage.verifyTextAtPageBySelector(
      signUpPage.lastNameHelperText,
      "Last Name is required"
    );
    await signUpPage.typeUsername("User");
    await signUpPage.clearField(signUpPage.signup_username_field);
    await signUpPage.verifyTextAtPageBySelector(
      signUpPage.usernameHelperText,
      "Username is required"
    );
    await signUpPage.typePassword("password");
    await signUpPage.clearField(signUpPage.signup_password_field);
    await signUpPage.verifyTextAtPageBySelector(
      signUpPage.passwordHelperText,
      "Enter your password"
    );
    await signUpPage.typeConfirmPassword("DIFFERENT PASSWORD");
    await signUpPage.verifyTextAtPageBySelector(
      signUpPage.confirmPasswordHelperText,
      "Password does not match"
    );
    await signUpPage.visualSnapshot("Display Sign Up Required Errors");
    await expect(signUpPage.signup_submit_btn).toBeDisabled();
    await signUpPage.visualSnapshot("Sign Up Submit Disabled");
  });

  test("should error for an invalid user", async ({}) => {
    await loginPage.login("invalidUserName", "invalidPa$$word");
    await loginPage.verifyTextAtPageBySelector(
      loginPage.signinError,
      "Username or password is invalid"
    );
    await loginPage.visualSnapshot(
      "Sign In, Invalid Username and Password, Username or Password is Invalid"
    );
  });

  test("should error for an invalid password for existing user", async ({ page }) => {
    let user: User = await loginPage.database("find", "users");
    await loginPage.login(user.username, "INVALID", { rememberUser: true });
    await loginPage.verifyTextAtPageBySelector(
      loginPage.signinError,
      "Username or password is invalid"
    );
    await loginPage.visualSnapshot("Sign In, Invalid Username, Username or Password is Invalid");
  });
});
