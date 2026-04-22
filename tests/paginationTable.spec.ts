import {test,expect, Locator} from '@playwright/test';  

test(" Verify pagination table", async({page})=>{
    await page.goto("https://practice.expandtesting.com/dynamic-pagination-table");

    let hasmorepages = true;
    
    while(hasmorepages){  // loop will continue until there are no more pages to navigate
    
        const rows: Locator[] = await page.locator("#example tbody tr").all();
        for (const row of rows){    // print all rows from the current page
            console.log(await row.innerText());
        }
        const nextButton: Locator = page.locator("a[data-dt-idx='next']");
        const nextButtonLi: Locator = nextButton.locator(".."); // parent of next button
        const isDisabled = await nextButtonLi.getAttribute("class"); // if class contains disabled then it means there are no more pages to navigate
        if(isDisabled?.includes("disabled")){ // if next button is disabled then we have reached to the last page
            hasmorepages = false;
            console.log("No more pages to navigate.");
        }
        else{ // click on next button to navigate to the next page
            await nextButton.click();
            await page.waitForTimeout(3000); // wait for 3 second for the next page to load
        }
    }
});

test(" Verify pagination table - Select number of pages", async({page})=>{
    await page.goto("https://practice.expandtesting.com/dynamic-pagination-table");
    const pageSizeDropdown: Locator = page.locator(".form-select");
    await pageSizeDropdown.selectOption('5'); // select 5 from dropdown to display 5 rows per page
    const rows: Locator[] = await page.locator("#example tbody tr").all();
    console.log("Total rows displayed on the page: ", rows.length);
    expect(rows).toHaveLength(5); // verify that only 5 rows are displayed on the page


  await page.waitForTimeout(3000);
});

test(" search for specific data in a table", async({page})=>{
    await page.goto("https://practice.expandtesting.com/dynamic-pagination-table");
    const searchBox: Locator = page.locator(".form-control");
    await searchBox.fill("Ethan Thomas"); // enter search text in search box

    const rows: Locator[] = await page.locator("#example tbody tr").all();
    if(rows.length > 0){
        let matchFound = false;
        for (const row of rows){
            const rowText = await row.innerText();
            if(rowText.includes("Ethan Thomas")){
                console.log("Data found: ", rowText);
                matchFound = true;
                break;
            }
        }
        expect(matchFound).toBeTruthy(); // verify that match is found in the table
    }
    else{
        console.log("No data found for the search text.");
    }

  await page.waitForTimeout(3000);
});
