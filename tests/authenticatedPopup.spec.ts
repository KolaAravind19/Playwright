import {test, expect} from '@playwright/test';

test("Verify authenticated popup", async ({ browser }) => {

    /* // Approach 1: using the syntax in the URL
    const context = await browser.newContext();
    const page = await context.newPage();
    // URL - https://the-internet.herokuapp.com/basic_auth
    // username - admin
    // password - admin
    
    //Syntax : https://username:password@URL
    await page.goto("https://admin:admin@the-internet.herokuapp.com/basic_auth");
    await page.locator("//p[contains(text(),'Congratulations!')]").isVisible();
   */


    // Approach 2: using the authenticate method of the page object
    const context = await browser.newContext({httpCredentials: { username: "admin", password: "admin" }});
    const page = await context.newPage();

    await page.goto("https://the-internet.herokuapp.com/basic_auth");
    await page.locator("//p[contains(text(),'Congratulations!')]").isVisible();

    await page.waitForTimeout(3000);
});
