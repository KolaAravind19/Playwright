import {test, expect} from '@playwright/test';
import fs from 'fs';
import {parse} from 'csv-parse/sync';

// Reading test data from CSV file
const csvpath = "testdata/data.csv";
const csvData = fs.readFileSync(csvpath, 'utf-8');
const loginTestData:any = parse(csvData, {
    columns: true,
    skip_empty_lines: true
});

test.describe("Login data driven testing", async()=>{
 for(const data of loginTestData){


        test(`Login test for ${data.email} and ${data.password}`, async ({ page }) => {
        await page.goto("https://demowebshop.tricentis.com/login");
        await page.locator(".email").fill(data.email);
        await page.locator(".password").fill(data.password);
        await page.locator("//input[@value='Log in']").click();

        if(data.validity.toLowerCase() === "valid"){
            const LogoutLink = page.locator("//a[text()='Log out']");
            await expect(LogoutLink).toBeVisible({timeout: 5000});
        }

        else{
            const errormessage = page.locator(".validation-summary-errors")
            await expect(errormessage).toBeVisible({timeout: 5000});
            // or
            await expect(page).toHaveURL("https://demowebshop.tricentis.com/login");
        }

});
}      
});

