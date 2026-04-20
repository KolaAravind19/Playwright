import { test, expect } from '@playwright/test';

test(" Verify hidden dropdown", async({page})=>{
    await page.goto("https://www.w3schools.com/");
    await page.locator("#search2").fill("html"); // search text

    //capture all the options from the drop down
    const options = page.locator("form div a");
    const count_options = await options.count();
    console.log("Total options: ", count_options);
    console.log("Options: ", await options.allTextContents());

    for (let i=0;i<count_options; i++){
        const text = await options.nth(i).innerText();
        console.log(text);
    }

 

    for (let i=0;i<count_options; i++){
        if(await options.nth(i).innerText() === "HTML Button Tag"){
            await options.nth(i).click();
            break;
        }
    }

       await page.waitForTimeout(5000);
});