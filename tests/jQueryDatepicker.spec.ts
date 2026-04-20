import {test,expect, Page} from '@playwright/test'

async function selectDate(targetyear: string,targetmonth: string,targetdate: string,page: Page, isFuture: boolean){
    while(true){
         const curr_month =await page.locator(".ui-datepicker-month").textContent(); // get the month from the calendar header
         const curr_year = await page.locator(".ui-datepicker-year").textContent(); // get the year from the calendar header
         if(curr_month===targetmonth && curr_year === targetyear){
            const all_dates = await page.locator(".ui-datepicker-calendar tbody td").all(); // get all dates from the calendar
            for (const dt of all_dates){
                if(await dt.innerText() ===targetdate){
                    await dt.click(); // click on the target date
                    break; //break for loop once we have found the target date
                }
            }
            break; // break the while loop once we have selected the date
         }
        if(isFuture){
        // Future date selection - click on next button to navigate to the next month 
        await page.locator(".ui-datepicker-next").click(); // click on next button to navigate to the next month
        } else{
        // Past date selection - click on previous button to navigate to the previous month
        await page.locator(".ui-datepicker-prev").click(); // click on previous button to navigate to the previous month
        }
    }

    await page.waitForTimeout(3000);
}




test(" Verify jQuery datepicker", async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    // await page.locator("#datepicker").fill('02/19/2000'); //directly filling the date in the input field

    const dateInpt =page.locator("#datepicker"); // click on datepicker input field to open the calendar
    await dateInpt.click();

    // Select target date
    const month = "February";
    const year = "2027";
    const date = "19";
    
    await selectDate(year, month, date, page, true); // call the function to select the date from the calendar (for past date selection isFuture parameter will be false)

    const expected_date = '02/19/2027';
    expect(dateInpt).toHaveValue(expected_date); // verify that the selected date is displayed in the input field
});