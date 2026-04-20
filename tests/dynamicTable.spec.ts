import {test, expect, Locator} from '@playwright/test';

test(" Verify dynamic table", async({page})=>{
    await page.goto("https://practice.expandtesting.com/dynamic-table");
    // verify table is visible on the page
    const table = page.locator(".table tbody");
    await expect(table).toBeVisible();

    //select all rows from the table and print total number of rows
    const rows: Locator[] =await table.locator("tr").all();
    console.log("Total Rows: ", rows.length);
    expect(rows).toHaveLength(4);

    //1. For Chrome process get value of CPU load
    // Read each row and check if Chrome is present in the first column, if yes then get CPU load from that row
    let cpuLoad = '';
    for (const row of rows){
        const processName = await row.locator("td").nth(0).innerText();
        if(processName === "Chrome"){
            //cpuLoad = await row.locator("td:has-text('%')").innerText(); //CSS Syntax to find td which has text % in it
            cpuLoad = await row.locator("td", {hasText: "%"}).innerText(); // Playwright way to find td which has text % in it
            console.log("CPU Load for Chrome:", cpuLoad);
            break;
        }
    }

    //2. Compare it with value in the yellow label.
    const yellowLabel: String =await page.locator("#chrome-cpu").innerText();
    console.log("Value in Yellow Label: ", yellowLabel);
    if(yellowLabel.includes(cpuLoad)){
        console.log("CPU Load value in the table matches with the value in yellow label.");
    }
    else{
        console.log("CPU Load value in the table does not match with the value in yellow label.");
    }
    expect(yellowLabel).toContain(cpuLoad);
});