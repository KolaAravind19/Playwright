import { test, expect, Locator } from '@playwright/test';

test(" verify radion buttons", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    const male:Locator = page.locator("#male")
    await male.check();
    await expect(male).toBeChecked();

    await page.waitForTimeout(2000);

    await page.locator("#female").check();
    await expect(male).not.toBeChecked();


    await page.waitForTimeout(2000);
});

test(" verify checkboxes", async ({ page }) => {
    
    await page.goto("https://testautomationpractice.blogspot.com/");

    //Select specific checkbox and assert
    /* const sunday:Locator = page.locator("#sunday")
    await sunday.check();
    await expect(sunday).toBeChecked();
    await page.waitForTimeout(2000); */

    //Select all checkboxes and assert
    const days: String[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const checkboxes: Locator[] = days.map(index => page.getByLabel(index));
    /*expect(checkboxes.length).toBe(7);
    for (const checkbox of checkboxes) {
        await checkbox.check();
        await expect(checkbox).toBeChecked();
    } */

    //uncheck last 3 checkboxes and assert
    /*for(const checkbox of checkboxes.slice(-3)){
        await checkbox.uncheck();
        await expect(checkbox).not.toBeChecked();
    }
    await page.waitForTimeout(2000); */

    //If checked, uncheck; if unchecked, check and assert
/*
    for (const checkbox of checkboxes){
        if (await checkbox.isChecked()){
            await checkbox.uncheck();
            await expect(checkbox).not.toBeChecked();
        }
        else{
            await checkbox.check();
            await expect(checkbox).toBeChecked();
        }

    } */

    //Randommly select checboxes - select checkboxes (1,3,6) and assert
    /* const indexes: number[] = [1, 3, 6];
    for (const i of indexes){
        await checkboxes[i].check();
        await expect(checkboxes[i]).toBeChecked();
    }
    await page.waitForTimeout(2000);  */

    // Select the checkbox based on the Label and assert
    const weekname: String = "Friday";
    for (const day of days){
        if(day.toLowerCase() === weekname.toLowerCase()){
            const checkbox: Locator = page.getByLabel(day);
            await checkbox.check();
            await expect(checkbox).toBeChecked();
        }
    }
    await page.waitForTimeout(2000);
});