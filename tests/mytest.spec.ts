import { test, expect } from '@playwright/test';

test('should have the correct title', async ({ page }) => {
    await page.goto('https://www.orangehrm.com/');
    const title = await page.title();
    console.log('Page title:', title);
    await expect(page).toHaveTitle('Human Resources Management Software | HRMS | OrangeHRM');
});