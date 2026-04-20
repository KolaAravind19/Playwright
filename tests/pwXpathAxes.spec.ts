import {test, expect, Locator} from '@playwright/test';

test(" verify different Xpath axes", async({page})=>{
    await page.goto("https://www.w3schools.com/html/html_tables.asp")

    // Self Axis
    const selflocator: Locator = page.locator("//td[text()='Germany']/self::td");
    console.log("Self Locator: "+ await selflocator.textContent());
    await expect(selflocator).toHaveText("Germany");

    // Parent Axis
    const parentlocator: Locator = page.locator("//td[text()='Germany']/parent::tr");
    console.log(parentlocator);
    await expect(parentlocator).toContainText("Alfreds Futterkiste");

    // Child Axis
    const childlocator: Locator = page.locator("//table[@id='customers']//tr[6]/child::td");
    await expect(childlocator.first()).toHaveText("Laughing Bacchus Winecellars");
    await expect(childlocator.nth(1)).toHaveText("Yoshi Tannamuri");
    await expect(childlocator.last()).toHaveText("Canada");

    // Ancestor Axis
    const ancestorlocator: Locator = page.locator("//td[text()='Germany']/ancestor::div/h3");
    await expect(ancestorlocator).toHaveText("Example");

    //descendant Axis
    const descendantlocator: Locator = page.locator("//table[@id='customers']/descendant::td");
    await expect(descendantlocator).toHaveCount(18);

    //following axis
    const followinglocator: Locator = page.locator("//table[@id='customers']/following::td");
    await expect(followinglocator).toHaveCount(20);

    //following-sibling axis
    const followingsiblinglocator: Locator = page.locator("//td[text()='Maria Anders']/following-sibling::td");
    await expect(followingsiblinglocator).toHaveText("Germany");

    //preceding axis
    const precedinglocator: Locator = page.locator("//td[text()='Austria']/preceding::td");
    await expect(precedinglocator.filter({hasText: "Germany"})).toHaveCount(1);
    await expect(precedinglocator.filter({hasText: "Mexico"})).toHaveCount(1);
    await expect(precedinglocator).toHaveCount(8);

    //preceding-sibling axis
    const precedingsiblinglocator: Locator = page.locator("//td[text()='Austria']/preceding-sibling::td");
    await expect(precedingsiblinglocator.last()).toHaveText("Roland Mendel");
    await expect(precedingsiblinglocator.first()).toHaveText("Ernst Handel");
});