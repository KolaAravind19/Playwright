import {test,expect, Locator} from '@playwright/test';

test(" Verify autosuggest dropdown", async({page})=>{
    await page.goto("https://www.flipkart.com/");
    await page.locator("//form[@class='lilxh_ header-form-search']//input[@placeholder='Search for Products, Brands and More']").fill("smart"); // search text
    await page.waitForTimeout(5000);
    
    // Get all the suggested options --> ctrl+shift+P on DOM --> emulate focused page
    const options: Locator = page.locator("ul>li");
 
    const options_count = await options.count();
    console.log("Total options: ", options_count);

    //printing all the suggested options 
    for (let i=0; i<options_count; i++){
        console.log(await options.nth(i).textContent());
    }

    // select or click on a particular option (smartphone)
    for (let i=0; i<options_count; i++){
        const text = await options.nth(i).textContent();
        if(text === "smartphone"){
            await options.nth(i).click();
            break;
        }
    }

    await page.waitForTimeout(3000);
});