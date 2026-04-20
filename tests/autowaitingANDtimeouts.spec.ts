import {test, expect} from '@playwright/test';

test("Auto waiting and timeouts", async ({page}) => {
    await page.goto("https://demowebshop.tricentis.com/ ");
    await page.locator('h2').filter({ hasText: 'Welcome to our store' }).isVisible();
});