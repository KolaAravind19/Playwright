import {test, expect} from '@playwright/test';

test(" Verify different built in Locators", async({page})=>{
    await page.goto("https://demo.nopcommerce.com/");
    const logo = page.getByAltText("nopCommerce demo store")
    await expect(logo).toBeVisible();
    await page.getByPlaceholder("Search store").fill("Apple MacBook Pro 13-inch");
    await page.getByRole("link", {name: "Register"}).click();
});