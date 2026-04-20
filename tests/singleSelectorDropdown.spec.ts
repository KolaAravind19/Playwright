import {test, expect, Locator} from '@playwright/test';

test(" Verify single selector dropdown", async({page})=>{
    
    await page.goto("https://testautomationpractice.blogspot.com/");

    // Select option from the drop downd - 4 types
    await page.locator("#country").selectOption("India"); // by using visible text
    await page.locator("#country").selectOption({value: "uk"}); // by using value attribute
    await page.locator("#country").selectOption({label: "Canada"}); // by using label
    await page.locator("#country").selectOption({index: 3}); // by using index

    // Check number of options in the dropdown(count)
    const dropdownOptions: Locator = page.locator("#country>option");
    await expect(dropdownOptions).toHaveCount(10);

    // check an option is present in the dropdown
    const option: String[] = (await dropdownOptions.allTextContents()).map(text=>text.trim());
    expect(option).toContain("India");

    // Printing Options from the dropdown
    for (const opt of option){
        console.log(opt);
    }
    await page.waitForTimeout(3000);
});