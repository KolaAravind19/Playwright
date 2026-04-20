import {test, expect, Page, chromium, firefox, webkit} from '@playwright/test';

 // Browser ---> context ---> page

 // Browser -> Chromium, Firefox, Webkit

 // context -> We can create multiple browser contexts in a single browser instance. Each context is like an incognito window, which means that it has its own cookies, cache, and local storage. This allows us to test different scenarios without affecting each other.

 // page -> A page is a single tab in a browser context. We can create multiple pages in a single context, and each page can have its own URL, cookies, and local storage.  

test("Verify browser context", async () =>
{
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    const page2 = await context.newPage();
    await page.goto("https://testautomationpractice.blogspot.com/");
    await page2.goto("https://www.google.com/");

    console.log("no of pages", context.pages().length); // to get the number of pages in the context

    await page.waitForTimeout(3000);
})