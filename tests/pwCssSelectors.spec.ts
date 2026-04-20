import {test, expect} from '@playwright/test';

test(" verify different CSS selectors", async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/")

    // tag with id
    //await page.locator("input#small-searchterms").fill("computer");
                  //or
    //await page.locator("#small-searchterms").fill("computer");


    // tag with class
    //await page.locator("input.search-box-text").fill("computer");
                  //or
    //await page.locator(".search-box-text").fill("computer");


    // tag with attribute
    //await page.locator("input[value='Search store']").fill("computer");
               //or
    //await page.locator("[value='Search store']").fill("computer");


    // tag with class with attribute
    //await page.locator("input.search-box-text[value='Search store']").fill("computer");
                    //or
    //await page.locator(".search-box-text[value='Search store']").fill("computer");

});