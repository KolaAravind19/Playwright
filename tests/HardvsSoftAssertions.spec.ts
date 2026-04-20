import {test, expect} from '@playwright/test';

test("Hard vs Soft Assertions", async ({page}) => {
    await page.goto("https://demowebshop.tricentis.com/");
    // await expect(page).toHaveTitle("Demo Web Shop2"); // Hard Assertion - if this assertion fails, the test will stop executing and will be marked as failed
    // await expect(page).toHaveURL("https://demowebshop.tricentis.com/"); 

    await expect.soft(page).toHaveTitle("Demo Web Shop2"); // Soft Assertion - if this assertion fails, the test will continue executing and will be marked as failed
    await expect(page).toHaveURL("https://demowebshop.tricentis.com/"); 

    await page.waitForTimeout(3000);
});