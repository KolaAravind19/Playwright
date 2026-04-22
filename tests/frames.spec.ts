/*
An iFrame (short for inline frame) is an HTML element that allows you to embed another HTML document within 
the current document. It is commonly used to display content from another source, such as a different 
website or a different part of the same website, without having to navigate away from the current page.

In Playwright, you can interact with iFrames using the `frame` method. This method allows you to access 
the content of the iFrame and perform actions on it, such as clicking buttons, filling forms, or 
extracting information.
*/

import {test, expect, Frame} from '@playwright/test';

test("Verify iFrame", async ({page}) => {
    await page.goto("https://ui.vision/demo/webtest/frames/");

    // Total no.of frames in the webpage
    const frames = page.frames(); 
    console.log("Total Frames: "+frames.length);

    // Interacting with elements inside the frame
    // Approach 1: Using page.frame method
    const frame1: null | Frame = page.frame({url: "https://ui.vision/demo/webtest/frames/frame_1.html"}); //by using page.frame we can access frame using url and name attribute of the frame
    if (frame1) {
        //await frame1.locator("[name='mytext1']").fill("Hello Frame 1");
        await frame1.fill("[name='mytext1']", "Hello Frame 1");
    }
    else{
        console.log("Frame not found");
    }

    // Approach 2: Using frame locator
    await page.frameLocator("[src='frame_1.html']").locator("[name='mytext1']").fill("Hello Frame 1 using frame locator"); //by using frame.locator we can access frame using any attribute of the frame

    await page.waitForTimeout(2000);
});


test("Verify nested iFrame", async ({page}) => {
    await page.goto("https://ui.vision/demo/webtest/frames/");

    const frame3: null | Frame  = page.frame({url: "https://ui.vision/demo/webtest/frames/frame_3.html"});
    if (frame3) {
        await frame3.locator("[name='mytext3']").fill("Hello Frame 3");
        const childFrames = frame3.childFrames();
        console.log("Total child frames in frame 3: "+childFrames.length);
        const radio = childFrames[0].getByLabel("I am a human");
        await radio.check();
        await expect(radio).toBeChecked();
    }
    else{
        console.log("Frame not found");
    }
    await page.waitForTimeout(2000);

});