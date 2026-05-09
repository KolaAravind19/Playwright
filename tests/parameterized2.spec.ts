import {test, expect} from '@playwright/test';

const loginTestData: string[][] = [
    ["laura.taylor1234@example.com", "test123", "valid"],
    ["invaliduser@example.com", "test321", "invalid"],
    ["validuser@example.com", "testxyz", "invalid"],
    ["", "", "invalid"],
];


 for(const [email, password, validity] of loginTestData){
test.describe("Login data driven testing", ()=>{

        test(`Login test for ${email} and ${password}`, async ({ page }) => {
        await page.goto("https://demowebshop.tricentis.com/login");
        await page.locator(".email").fill(email);
        await page.locator(".password").fill(password);
        await page.locator("//input[@value='Log in']").click();

        if(validity.toLowerCase() === "valid"){
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
   
});
}

