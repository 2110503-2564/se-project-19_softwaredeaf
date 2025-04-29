import { test, expect } from "playwright/test"
test.use({ storageState: 'storage/storageState-bankbook.json' });

test('UC2-6-1', async ({ page }) => {
    
    await page.goto('http://localhost:3000/mybooking/680fb92109cfe8174f3b20b7/edit');
    await page.getByRole('button', { name: 'Edit' }).click();
    await page.getByRole('spinbutton').click();
    await page.getByRole('spinbutton').fill('3');
    page.on("dialog", async (dialog) => {
        console.log("Dialog message:", dialog.message()); 
        expect(dialog.message()).toContain("Update Amenity!"); 
        await dialog.dismiss(); 
      });
    await page.locator('div').filter({ hasText: /^AmenitiesGuitarAmount :FromStart DateStart DateToEnd DateEnd Date$/ }).getByLabel('Choose date, selected date is May 1,').click();
    await page.waitForTimeout(500);
    await page.getByRole('gridcell', { name: '1', exact: true }).click();
    await page.waitForTimeout(500);
    await page.locator('div').filter({ hasText: /^AmenitiesGuitarAmount :FromStart DateStart DateToEnd DateEnd Date$/ }).getByLabel('Choose date, selected date is May 2,').click();
    await page.waitForTimeout(500);
    await page.getByRole('gridcell', { name: '2', exact: true }).click();
    await page.waitForTimeout(500);
    await page.getByRole('button', { name: 'Delete' }).click();
})

test('UC2-6-2', async ({ page }) => {
    
    await page.goto('http://localhost:3000/mybooking/680fb92109cfe8174f3b20b7/edit');
    await page.getByRole('button', { name: 'Edit' }).click();
    await page.getByRole('spinbutton').click();
    await page.getByRole('spinbutton').fill('0');
    page.on("dialog", async (dialog) => {
        console.log("Dialog message:", dialog.message()); 
        expect(dialog.message()).toContain("Amount must be in range 1-5"); 
        await dialog.dismiss(); 
      });
    await page.locator('div').filter({ hasText: /^AmenitiesGuitarAmount :FromStart DateStart DateToEnd DateEnd Date$/ }).getByLabel('Choose date, selected date is May 1,').click();
    await page.waitForTimeout(500);
    await page.getByRole('gridcell', { name: '1', exact: true }).click();
    await page.waitForTimeout(500);
    await page.locator('div').filter({ hasText: /^AmenitiesGuitarAmount :FromStart DateStart DateToEnd DateEnd Date$/ }).getByLabel('Choose date, selected date is May 2,').click();
    await page.waitForTimeout(500);
    await page.getByRole('gridcell', { name: '2', exact: true }).click();
    await page.waitForTimeout(500);
    await page.getByRole('button', { name: 'Delete' }).click();
})

test('UC2-6-3', async ({ page }) => {
    
    await page.goto('http://localhost:3000/mybooking/680fb92109cfe8174f3b20b7/edit');
    await page.getByRole('button', { name: 'Edit' }).click();
    await page.getByRole('spinbutton').click();
    await page.getByRole('spinbutton').fill('8');
    page.on("dialog", async (dialog) => {
        console.log("Dialog message:", dialog.message()); 
        expect(dialog.message()).toContain("Amount must be in range 1-5"); 
        await dialog.dismiss(); 
      });
    await page.locator('div').filter({ hasText: /^AmenitiesGuitarAmount :FromStart DateStart DateToEnd DateEnd Date$/ }).getByLabel('Choose date, selected date is May 1,').click();
    await page.waitForTimeout(500);
    await page.getByRole('gridcell', { name: '1', exact: true }).click();
    await page.waitForTimeout(500);
    await page.locator('div').filter({ hasText: /^AmenitiesGuitarAmount :FromStart DateStart DateToEnd DateEnd Date$/ }).getByLabel('Choose date, selected date is May 2,').click();
    await page.waitForTimeout(500);
    await page.getByRole('gridcell', { name: '2', exact: true }).click();
    await page.waitForTimeout(500);
    await page.getByRole('button', { name: 'Delete' }).click();
})

test('UC2-6-4', async ({ page }) => {
    
    await page.goto('http://localhost:3000/mybooking/680fb92109cfe8174f3b20b7/edit');
    await page.getByRole('button', { name: 'Edit' }).click();
    await page.getByRole('spinbutton').click();
    await page.getByRole('spinbutton').fill('5');
    page.on("dialog", async (dialog) => {
        console.log("Dialog message:", dialog.message()); 
        expect(dialog.message()).toContain("Invalid booking date"); 
        await dialog.dismiss(); 
      });
      await page.locator('div').filter({ hasText: /^AmenitiesGuitarAmount :FromStart DateStart DateToEnd DateEnd Date$/ }).getByLabel('Choose date, selected date is May 2,').click();
      await page.waitForTimeout(500);
      await page.getByRole('gridcell', { name: '1', exact: true }).click();
      await page.waitForTimeout(500);
      await page.getByRole('button', { name: 'Choose date, selected date is' }).nth(2).click();
      await page.waitForTimeout(500);
      await page.getByRole('gridcell', { name: '2', exact: true }).click();
    await page.getByRole('button', { name: 'Delete' }).click();
})