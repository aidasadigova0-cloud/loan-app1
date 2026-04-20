import { test, expect } from '@playwright/test';
import { CalculatorPage } from './pages/calculator.page';
import { LaunchDetailsPage } from './pages/launch-details.page';

const serviceURL = 'http://localhost:3000';

test('default flow with mock', async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);

    const amountValue = '22.3';
    const amountResponse = { paymentAmountMonthly: amountValue };

    await page.route('**/api/loan-calc?amount=500&period=12', async route => {
        await route.fulfill({ json: amountResponse });
    });

    await calculatorPage.goto(serviceURL);
    await expect(calculatorPage.monthlyPaymentField).toBeVisible();

    const monthlyValue = await calculatorPage.getMonthlyPaymentAmount();
    expect(monthlyValue).toBe(amountValue);
});

test('default state check elements', async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);

    await calculatorPage.goto(serviceURL);

    await expect(calculatorPage.applyButton).toBeVisible();
});
test('main flow', async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    const launchDetailsPage = new LaunchDetailsPage(page);

    const requestPromise = page.waitForRequest('**/api/loan-calc?amount=500&period=12');
    await calculatorPage.goto(serviceURL);
    await requestPromise;

    await calculatorPage.login('username', 'password');

    await expect(launchDetailsPage.continueButton).toBeVisible();
    await launchDetailsPage.clickContinue();

    await expect(launchDetailsPage.successOkButton).toBeVisible();
    await launchDetailsPage.clickSuccessOk();
});

test('redirect flow', async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);

    await calculatorPage.goto(serviceURL);

    await calculatorPage.imageButton1.click();
    await expect(calculatorPage.applyButton).toBeInViewport();

    await calculatorPage.imageButton2.click();
    await expect(calculatorPage.applyButton).toBeInViewport();
});