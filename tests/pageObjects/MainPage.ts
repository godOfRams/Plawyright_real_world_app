import { BasePage } from "./BasePage";
import { Page, Locator, expect } from "@playwright/test";

export class MainPage extends BasePage {
  readonly logOutBtn: Locator;
  readonly user_onboarding_dialog: Locator;
  readonly list_skeleton: Locator;
  readonly navTopNotificationsCount: Locator;
  readonly userOnboardingNext: Locator;
  readonly transactionList: Locator;

  constructor(page: Page) {
    super(page);
    this.user_onboarding_dialog = page.locator(`[data-test=user-onboarding-dialog]`);
    this.list_skeleton = page.locator(`[data-test=list-skeleton]`);
    this.logOutBtn = page.locator(`[data-test=sidenav-signout]`);
    this.navTopNotificationsCount = page.locator(`[data-test=nav-top-notifications-count]`);
    this.userOnboardingNext = page.locator(`[data-test=user-onboarding-next]`);
    this.transactionList = page.locator(`[data-test=transaction-list]`);
  }

  //TODO: add check for mobile
  clickLogOutBtn = async () => {
    await expect(this.logOutBtn).toBeVisible();
    await this.logOutBtn.click();
  };
}
