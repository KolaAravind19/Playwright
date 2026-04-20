import {test, expect, Locator} from '@playwright/test';

test(" Verify different built in Xpath", async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/");
    await page.locator("//html/body/div[4]/div[1]/div[1]/div[3]/form/input[1]").fill("computer");
    await page.locator("//html/body/div[4]/div[1]/div[1]/div[3]/form/input[2]").click();
    const computer: Locator = page.locator("//*[href, 'build']");
    const computers_count = await computer.count();
    console.log("Total Computers: "+computers_count);
});