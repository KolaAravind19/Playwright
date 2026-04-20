import {test ,expect, Locator} from '@playwright/test';

test(" Verify static table", async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/"); 
    // verify table is visible on the page
    const table: Locator = page.locator("table[name='BookTable'] tbody");
    await expect(table).toBeVisible();

    // count number of rows
    //const rows: Locator = page.locator("table[name='BookTable'] tbody tr");
    const rows: Locator = table.locator("tr");
    const row_count = await rows.count();
    console.log("Total Rows: "+row_count);
    //await expect(rows).toHaveCount(7); 
    expect(row_count).toBe(7);

    // count number of columns
    const columns: Locator = rows.locator("th");
    const column_count = await columns.count();
    console.log("Total Columns: "+column_count);
    expect(column_count).toBe(4);

    // Read all data from 2nd row
    const second_row: Locator = rows.nth(2).locator("td");
    const second_row_data: String[] = (await second_row.allInnerTexts());
    console.log("Data from 2nd Row: ", second_row_data);

    // Read all data from table excluding header
    const all_rows: Locator[] = await rows.all();  // all return array of locators
    for (const row of all_rows.slice(1)){  // slice(1) will exclude header row
        const cols: String[] = await row.locator("td").allInnerTexts();
        console.log(cols.join("\t"));
    }

    // print book name where author is "Mukesh"
    let count_books_by_mukesh = 0;
    console.log("Book name where author is Mukesh: ");
    for (const row of all_rows.slice(1)){
        const cells = await row.locator("td").allInnerTexts();
        const author = cells[1]; // author is in 2nd column
        const book = cells[0]; // book name is in 1st column
        if(author === "Mukesh"){
            count_books_by_mukesh++
            console.log(`${author} \t ${book}`); 
        }
        
    }
    console.log("Total books by Mukesh: ", count_books_by_mukesh);
    expect(count_books_by_mukesh).toBe(2);


    // find total price of all books
    let total_price = 0;
    for (const row of all_rows.slice(1)){
    const cells = await row.locator("td").allInnerTexts();
    const price = cells[3]; // price is in 4th column
    total_price += parseInt(price);
    }
    console.log("Total Price of all books: ", total_price);
    expect(total_price).toBe(7100);
});