import { Page, Locator, expect } from '@playwright/test';

export class CalculatorPage {
    readonly page: Page;

    readonly applyButton: Locator;
    readonly monthlyPaymentField: Locator;
    readonly imageButton1: Locator;
    readonly imageButton2: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginContinueButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.applyButton         = page.getByTestId('id-small-loan-calculator-field-apply');
        this.monthlyPaymentField = page.getByTestId('ib-small-loan-calculator-field-monthlyPayment');
        this.imageButton1        = page.getByTestId('id-image-element-button-image-1');
        this.imageButton2        = page.getByTestId('id-image-element-button-image-2');
        this.usernameInput       = page.getByTestId('login-popup-username-input');
        this.passwordInput       = page.getByTestId('login-popup-password-input');
        this.loginContinueButton = page.getByTestId('login-popup-continue-button');
    }

    async goto(url: string) {
        await this.page.goto(url);
    }

    async getMonthlyPaymentAmount(): Promise<string> {
        const text = await this.monthlyPaymentField.textContent();
        return text?.replace('€', '').trim() ?? '';
    }

    async login(username: string, password: string) {
        await this.applyButton.click();
        await this.usernameInput.click();
        await this.usernameInput.fill(username);
        await this.usernameInput.press('Tab');
        await this.passwordInput.fill(password);
        await this.loginContinueButton.click();
    }
}