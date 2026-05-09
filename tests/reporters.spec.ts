import {test,expect} from '@playwright/test';

test.beforeEach(async ({ page }) => {
     await page.goto("https://demowebshop.tricentis.com/");
});


test('logotest', async ({ page }) => {
    await expect(page.locator("img[alt='Tricentis Demo Web Shop']")).toBeVisible();
});

test('Title', async ({ page }) => {
    await expect(page).toHaveTitle("Demo Web Shop");
});

test('login', async ({ page }) => {
    await page.locator("#small-searchterms").fill("laptop");
    await page.locator('input[type="submit"]').click();
    await expect.soft(page.locator('h2 a').nth(0)).toContainText("laptop", { ignoreCase: true });
});