import { Page, Locator, expect } from '@playwright/test';

export class LaunchDetailsPage {
    readonly page: Page;

    readonly continueButton: Locator;
    readonly successOkButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.continueButton  = page.getByTestId('final-page-continue-button');
        this.successOkButton = page.getByTestId('final-page-success-ok-button');
    }

    async clickContinue() {
        await this.continueButton.click();
    }

    async clickSuccessOk() {
        await this.successOkButton.click();
    }
}