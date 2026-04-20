import {test, expect, Locator} from '@playwright/test';

test(" Verify multi selector dropdown", async({page})=>{
    
    await page.goto("https://testautomationpractice.blogspot.com/");

    // Select option from the drop downd
    // await page.locator("#colors").selectOption(['Red', 'Blue']); // by using visible text
    // await page.locator("#colors").selectOption(['red', 'blue']); // by using value attribute
    // await page.locator("#colors").selectOption([{label: "Red"}, {label: "Blue"}]); // by using label
    // await page.locator("#colors").selectOption([{index: 0}, {index: 2}]); // by using index

    // // Check number of options in the dropdown(count)
    const dropdownOptions: Locator = page.locator("#colors>option");
    await expect(dropdownOptions).toHaveCount(7);

    // // check an option is present in the dropdown
    const option: String[] = (await dropdownOptions.allTextContents()).map(text=>text.trim());
    expect(option).toContain("Red");

    // // Printing Options from the dropdown
    for (const opt of option){
        console.log(opt);
 }
    await page.waitForTimeout(3000);
});