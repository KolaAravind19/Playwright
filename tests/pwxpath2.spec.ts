import {test, expect, Locator} from '@playwright/test';

test(" Verify different built in Xpath", async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/");
    let numbers = page.locator("(//a[contains(@href, '/build-your-cheap-own-computer')])[last()]");
    const count = await numbers.count();
    console.log("Total Computers: "+count);
    await numbers.click();
    await page.locator("//a[text()='Register']").click();
});