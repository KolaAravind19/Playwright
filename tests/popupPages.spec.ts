import { test, expect } from '@playwright/test';

test("Verify popup pages", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://testautomationpractice.blogspot.com/");

    // This 2 statements should go paralelly
    // await page.waitForEvent('popup'); // to wait for the popup page to open when we click on the popup button
    // await page.locator("#PopUp").click();
    await Promise.all([page.waitForEvent('popup'), page.locator("#PopUp").click()]);

    const allPopupWindows = context.pages(); // to get all the pages in the context including the popup page
    console.log("no of pages: ", allPopupWindows.length); // to get the number of pages in the context
    

    for(const pw of allPopupWindows) {
        const title = await pw.title();
        if(title.includes("Selenium")){
            await pw.waitForTimeout(3000);
            await pw.locator('a:has-text("Register now!")').click();
            await pw.close();
        }
    }
    await page.waitForTimeout(3000);
}); 
