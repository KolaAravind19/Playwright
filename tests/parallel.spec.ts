import {test} from '@playwright/test';

test.describe.configure({mode: 'serial'});

test('test1', async ({ page }) => {
    console.log('test1');
});

test('test2', async ({ page }) => {
    console.log('test2');
});
test('test3', async ({ page }) => {
    console.log('test3');
});   
test('test4', async ({ page }) => {
    console.log('test4');
});
test('test5', async ({ page }) => {
    console.log('test5');
});

