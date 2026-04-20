import { test, expect, chromium } from '@playwright/test';

test("Verify tabs in the browser", async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();

    const Parentpage = await context.newPage();
    await Parentpage.goto("https://testautomationpractice.blogspot.com/");

    // This 2 statements should go paralelly
    // context.waitForEvent('page'); // here page event is used to wait for the new page to open when we click on the new tab button
    // await Parentpage.locator("button:has-text('New Tab')").click();
    const [childPage] = await Promise.all([context.waitForEvent('page'), Parentpage.locator("button:has-text('New Tab')").click()]);
    console.log("New page URL: ", childPage.url());

    // Approach 1: switch between pages and get titles(using)
    const pages = context.pages();   // returns an array of all the pages in the context
    console.log("no.of pages: ", pages.length);
    console.log("Title of the parent page: ",await pages[0].title());
    console.log("Title of the child page: ", await pages[1].title());

    // Approach 2: directly get the titles without switching
    console.log("Title of the parent page: ", await Parentpage.title());
    console.log("Title of the child page: ", await childPage.title());
    

    await Parentpage.waitForTimeout(3000);
});