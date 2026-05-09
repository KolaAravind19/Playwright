import {test, expect} from '@playwright/test';

const searchItems: string[] = ["laptop", "Gift card", "smartphone", 'monitor'];

//using loop  for-of loop
/*for (const item of searchItems) {
    test(`login ${item}`, async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com/");
    await page.locator("#small-searchterms").fill(item);
    await page.locator('input[type="submit"]').click();
    await expect.soft(page.locator('h2 a').nth(0)).toContainText(item, { ignoreCase: true});
});
}  */



// using for each function
/*searchItems.forEach((item)=>{
    test(`login ${item}`, async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com/");
    await page.locator("#small-searchterms").fill(item);
    await page.locator('input[type="submit"]').click();
    await expect.soft(page.locator('h2 a').nth(0)).toContainText(item, { ignoreCase: true});
});
}) */



// using test.describe
test.describe("searchig items", async()=>{
    searchItems.forEach((item)=>{
    test(`login ${item}`, async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com/");
    await page.locator("#small-searchterms").fill(item);
    await page.locator('input[type="submit"]').click();
    await expect.soft(page.locator('h2 a').nth(0)).toContainText(item, { ignoreCase: true});
});
}) 
});

