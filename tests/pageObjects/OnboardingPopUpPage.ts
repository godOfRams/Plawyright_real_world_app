import { BasePage } from "./BasePage";
import { Page, Locator } from "@playwright/test";

export class OnboardingPopUpPage extends BasePage {
  readonly user_onboarding_dialog: Locator;
  readonly userOnboardingNext: Locator;
  readonly userOnboardingDialogTitle: Locator;
  readonly bankNameInput: Locator;
  readonly accountNumberInput: Locator;
  readonly routingNumberInput: Locator;
  readonly saveButton: Locator;
  readonly userOnboardingDialogContent: Locator;

  constructor(page: Page) {
    super(page);
    this.user_onboarding_dialog = page.locator(`[data-test=user-onboarding-dialog]`);
    this.userOnboardingNext = page.locator(`[data-test=user-onboarding-next]`);
    this.userOnboardingDialogTitle = page.locator(`[data-test=user-onboarding-dialog-title]`);
    this.bankNameInput = page.locator(`#bankaccount-bankName-input`);
    this.accountNumberInput = page.locator(`#bankaccount-routingNumber-input`);
    this.routingNumberInput = page.locator(`#bankaccount-accountNumber-input`);
    this.saveButton = page.locator(`[data-test="bankaccount-submit"]`);
    this.userOnboardingDialogContent = page.locator(`[data-test="user-onboarding-dialog-content"]`);
  }

  clickNextOnOnboarding = async () => {
    await this.clickButton(this.userOnboardingNext);
  };

  typeBankName = async (bankName: string) => {
    await this.typeInField(this.bankNameInput, bankName);
  };

  typeAccountNumber = async (accountNumber: string) => {
    await this.typeInField(this.accountNumberInput, accountNumber);
  };

  typeRoutingNumber = async (routingNumber: string) => {
    await this.typeInField(this.routingNumberInput, routingNumber);
  };
  clickSaveOnOnboarding = async () => {
    await this.clickButton(this.saveButton);
  };
}
