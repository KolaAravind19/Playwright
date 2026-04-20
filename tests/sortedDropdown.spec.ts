import { test, expect, Locator } from '@playwright/test';

test(" Verify sorted dropdown", async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    //const dropdownOptions: Locator = page.locator("#colors>option"); // failed because not sorted
    const dropdownOptions: Locator = page.locator("#animals>option"); // passed because sorted
    const option: String[] = (await dropdownOptions.allTextContents()).map(text=>text.trim());

    const originalList: String[] = [...option];
    const sortedList: String[] = [...option].sort();
    expect(sortedList).toEqual(originalList);
});

test.only(" verify dropdown having duplicate values", async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    const dropdownOptions: Locator = page.locator("#colors>option");
    const option: String[] = (await dropdownOptions.allTextContents()).map(text=>text.trim());

    const myset = new Set<String>();   // Set will store only unique values
    const duplicateValues: String[] = [];  // Array to store duplicate values

    for ( const opt of option){
        if(myset.has(opt)){
            duplicateValues.push(opt);
        } else {
            myset.add(opt);
        }
    }
    console.log("Duplicate Values: "+duplicateValues);
    expect(duplicateValues.length).toBe(0);  // Failed because there are duplicate values in the dropdown
});