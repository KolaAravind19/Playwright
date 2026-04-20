// alert(), confirm(), prompt()

import {test, expect} from '@playwright/test';

test("Verify alert dialog box", async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");


    page.on('dialog', (dialog) => {
        console.log(dialog.message(),":", dialog.type()); //dialog.message returns message of the dialog and dialog.type returns which type the dialog box is alert or confirm or prompt
        dialog.accept();
        expect(dialog.type()).toBe('alert');
    });
    
    await page.locator("#alertBtn").click();
    //await page.locator("#confirmBtn").click();


    await page.waitForTimeout(3000);
});

test("Verify confirm dialog box", async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");


    page.on('dialog', (dialog) => {
        console.log(dialog.message(),":", dialog.type()); //dialog.message returns message of the dialog and dialog.type returns which type the dialog box is alert or confirm or prompt
        dialog.accept();
        //dialog.dismiss();
        expect(dialog.type()).toBe('confirm');
    });
    
    await page.locator("#confirmBtn").click();
    const text = await page.locator("#demo").textContent();
    
    expect(text).toContain("Cancel");
    await page.waitForTimeout(3000);
});



test.only("Verify prompt dialog box", async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");


    page.on('dialog', (dialog) => {
        console.log(dialog.message(),":", dialog.type()); //dialog.message returns message of the dialog and dialog.type returns which type the dialog box is alert or confirm or prompt
        //dialog.dismiss();
        console.log(dialog.defaultValue()); // returns default value of the prompt dialog box
        expect(dialog.defaultValue()).toBe("Harry Potter"); // to check the default value of the prompt dialog box
        expect(dialog.type()).toBe('prompt');
        dialog.accept('Aravind'); // to enter value in the prompt dialog box and click on ok button
    });
    
    await page.locator("#promptBtn").click();
    const text = await page.locator("#demo").textContent();
    console.log(text);
    expect(text).toContain("Aravind");
    await page.waitForTimeout(3000);
});
