import { test, expect } from "playwright/test"

test.use({ storageState: 'storage/storageState-karn1.json' });

test('UC2-2-1', async ({ page }) => {
    test.setTimeout(60000);
    //Precondition
    await page.goto('http://localhost:3000/campground/680f247c155842edd2567797');
    await page.getByRole('button', { name: 'Book Now' }).click();
    await page.getByRole('textbox', { name: 'Name Surname' }).fill('Somchai');
    await page.getByRole('textbox', { name: 'Name Surname' }).press('Tab');
    await page.locator('div').filter({ hasText: /^Surname$/ }).locator('#outlined-basic').fill('Sukjing');
    await page.locator('div').filter({ hasText: /^Start Date$/ }).getByLabel('Choose date').click();
    await page.getByRole('button', { name: 'Next month' }).click();
    await page.waitForTimeout(500);
    await page.getByRole('gridcell', { name: '1', exact: true }).click();
    await page.getByRole('button', { name: 'Choose date', exact: true }).click();
    await page.waitForTimeout(500);
    await page.getByRole('gridcell', { name: '2', exact: true }).click();
    //EndPrecondition

    //Test
    page.on("dialog", async (dialog) => {
        console.log("Dialog message:", dialog.message()); // ดึงข้อความจาก dialog
        expect(dialog.message()).toContain("Added Picnic Table to your booking"); // ตรวจสอบข้อความ
        await dialog.dismiss(); // ปิด dialog
    });
    await page.getByRole('button', { name: 'Add' }).nth(1).click();
    await page.getByRole('button', { name: 'Choose date' }).nth(2).click();
    await page.waitForTimeout(500);
    await page.getByRole('gridcell', { name: '1', exact: true }).click();
    await page.waitForTimeout(500);
    await page.getByRole('button', { name: 'Choose date', exact: true }).click();
    await page.waitForTimeout(500);
    await page.getByRole('gridcell', { name: '2', exact: true }).click();
    await page.getByRole('spinbutton').click();
    await page.getByRole('spinbutton').press('ControlOrMeta+a');
    await page.getByRole('spinbutton').fill('5');
    await page.locator('div').filter({ hasText: /^Amount:$/ }).click();
    await page.getByRole('button', { name: 'Submit' }).click();
    //EndTest
})

test('UC2-2-2', async ({ page }) => {
    test.setTimeout(60000);
    //Precondition
    await page.goto('http://localhost:3000/campground/680f247c155842edd2567797');
    await page.getByRole('button', { name: 'Book Now' }).click();
    await page.getByRole('textbox', { name: 'Name Surname' }).fill('Somchai');
    await page.getByRole('textbox', { name: 'Name Surname' }).press('Tab');
    await page.locator('div').filter({ hasText: /^Surname$/ }).locator('#outlined-basic').fill('Sukjing');

    //Test
    page.on("dialog", async (dialog) => {
        console.log("Dialog message:", dialog.message()); // ดึงข้อความจาก dialog
        expect(dialog.message()).toContain("DateFrom can't before BookFrom"); // ตรวจสอบข้อความ
        await dialog.dismiss(); // ปิด dialog
    });
    await page.getByRole('button', { name: 'Add' }).nth(1).click();
    await page.getByRole('button', { name: 'Choose date' }).nth(2).click();
    page.waitForTimeout(500);
    await page.getByRole('gridcell', { name: '30' }).click();
    page.waitForTimeout(500);
    await page.locator('div').filter({ hasText: /^FromStart DateStart DateToEnd DateEnd Date$/ }).getByLabel('Choose date', { exact: true }).click();
    page.waitForTimeout(500);
    await page.getByRole('dialog', { name: 'End Date' })
        .getByRole('button', { name: 'Next month' })
        .click();


    page.waitForTimeout(1000);
    await page.locator('[role="gridcell"]:not([disabled])')
         .filter({ hasText: '2' })
         .nth(0)
         .click();


    page.waitForTimeout(500);
    await page.locator('div').filter({ hasText: /^Date:FromStart DateStart Date$/ }).getByLabel('Choose date').click();
    page.waitForTimeout(500);
    await page.getByRole('dialog', { name: 'Start Date' })
         .getByRole('button', { name: 'Next month' })
         .click();

    page.waitForTimeout(500);
    await page.locator('[role="gridcell"]:not([disabled])')
         .filter({ hasText: '1' })
         .nth(0)
         .click();
    page.waitForTimeout(500);
    await page.getByRole('button', { name: 'Choose date', exact: true }).click();
    await page.locator('[role="gridcell"]:not([disabled])')
         .filter({ hasText: '2' })
         .nth(0)
         .click();
    await page.getByRole('button', { name: 'Submit' }).click();
    //EndTest


})
test('UC2-2-3', async ({ page }) => {
    test.setTimeout(60000);
    //Precondition
    await page.goto('http://localhost:3000/campground/680f247c155842edd2567797');
    await page.getByRole('button', { name: 'Book Now' }).click();
    await page.getByRole('textbox', { name: 'Name Surname' }).fill('Somchai');
    await page.getByRole('textbox', { name: 'Name Surname' }).press('Tab');
    await page.locator('div').filter({ hasText: /^Surname$/ }).locator('#outlined-basic').fill('Sukjing');
    await page.locator('div').filter({ hasText: /^Start Date$/ }).getByLabel('Choose date').click();
    await page.getByRole('button', { name: 'Next month' }).click();
    await page.waitForTimeout(500);
    await page.getByRole('gridcell', { name: '1', exact: true }).click();
    await page.getByRole('button', { name: 'Choose date', exact: true }).click();
    await page.waitForTimeout(500);
    await page.getByRole('gridcell', { name: '2', exact: true }).click();
    //EndPrecondition

    //Test
    page.on("dialog", async (dialog) => {
        console.log("Dialog message:", dialog.message()); // ดึงข้อความจาก dialog
        expect(dialog.message()).toContain("DateTo can't before DateFrom"); // ตรวจสอบข้อความ
        await dialog.dismiss(); // ปิด dialog
    });
    await page.getByRole('button', { name: 'Add' }).nth(1).click();
    await page.getByRole('button', { name: 'Choose date' }).nth(3).click();
    await page.waitForTimeout(500);
    await page.getByRole('button', { name: 'Next month' }).click();
    await page.waitForTimeout(500);
    await page.getByRole('gridcell', { name: '1', exact: true }).click();
    await page.waitForTimeout(500);
    await page.getByRole('button', { name: 'Choose date', exact: true }).click();
    await page.waitForTimeout(500);
    await page.getByRole('gridcell', { name: '2', exact: true }).click();
    await page.getByRole('spinbutton').click();
    await page.getByRole('spinbutton').press('ControlOrMeta+a');
    await page.getByRole('spinbutton').fill('5');
    await page.locator('div').filter({ hasText: /^Amount:$/ }).click();
    await page.getByRole('button', { name: 'Submit' }).click();
    //EndTest
})
test('UC2-2-4', async ({ page }) => {
    test.setTimeout(60000);
    //Precondition
    await page.goto('http://localhost:3000/campground/680f247c155842edd2567797');
    await page.getByRole('button', { name: 'Book Now' }).click();
    await page.getByRole('textbox', { name: 'Name Surname' }).fill('Somchai');
    await page.getByRole('textbox', { name: 'Name Surname' }).press('Tab');
    await page.locator('div').filter({ hasText: /^Surname$/ }).locator('#outlined-basic').fill('Sukjing');
    await page.locator('div').filter({ hasText: /^Start Date$/ }).getByLabel('Choose date').click();
    await page.getByRole('button', { name: 'Next month' }).click();
    await page.waitForTimeout(500);
    await page.getByRole('gridcell', { name: '1', exact: true }).click();
    await page.getByRole('button', { name: 'Choose date', exact: true }).click();
    await page.waitForTimeout(500);
    await page.getByRole('gridcell', { name: '2', exact: true }).click();
    //EndPrecondition

    //Test
    page.on("dialog", async (dialog) => {
        console.log("Dialog message:", dialog.message()); // ดึงข้อความจาก dialog
        expect(dialog.message()).toContain("Amount must be at least 1"); // ตรวจสอบข้อความ
        await dialog.dismiss(); // ปิด dialog
    });
    await page.getByRole('button', { name: 'Add' }).nth(1).click();
    await page.getByRole('button', { name: 'Choose date' }).nth(2).click();
    await page.waitForTimeout(500);
    await page.getByRole('gridcell', { name: '1', exact: true }).click();
    await page.waitForTimeout(500);
    await page.getByRole('button', { name: 'Choose date', exact: true }).click();
    await page.waitForTimeout(500);
    await page.getByRole('gridcell', { name: '2', exact: true }).click();
    await page.getByRole('spinbutton').click();
    await page.getByRole('spinbutton').press('ControlOrMeta+a');
    await page.getByRole('spinbutton').fill('-3');
    await page.locator('div').filter({ hasText: /^Amount:$/ }).click();
    await page.getByRole('button', { name: 'Submit' }).click();
    //EndTest
})
test('UC2-2-5', async ({ page }) => {
    test.setTimeout(60000);
    //Precondition
    await page.goto('http://localhost:3000/campground/680f247c155842edd2567797');
    await page.getByRole('button', { name: 'Book Now' }).click();
    await page.getByRole('textbox', { name: 'Name Surname' }).fill('Somchai');
    await page.getByRole('textbox', { name: 'Name Surname' }).press('Tab');
    await page.locator('div').filter({ hasText: /^Surname$/ }).locator('#outlined-basic').fill('Sukjing');
    await page.locator('div').filter({ hasText: /^Start Date$/ }).getByLabel('Choose date').click();
    await page.getByRole('button', { name: 'Next month' }).click();
    await page.waitForTimeout(500);
    await page.getByRole('gridcell', { name: '1', exact: true }).click();
    await page.getByRole('button', { name: 'Choose date', exact: true }).click();
    await page.waitForTimeout(500);
    await page.getByRole('gridcell', { name: '2', exact: true }).click();
    //EndPrecondition

    //Test
    page.on("dialog", async (dialog) => {
        console.log("Dialog message:", dialog.message()); // ดึงข้อความจาก dialog
        expect(dialog.message()).toContain("Amount must not be greater than 10"); // ตรวจสอบข้อความ
        await dialog.dismiss(); // ปิด dialog
    });
    await page.getByRole('button', { name: 'Add' }).nth(1).click();
    await page.getByRole('button', { name: 'Choose date' }).nth(2).click();
    await page.waitForTimeout(500);
    await page.getByRole('gridcell', { name: '1', exact: true }).click();
    await page.waitForTimeout(500);
    await page.getByRole('button', { name: 'Choose date', exact: true }).click();
    await page.waitForTimeout(500);
    await page.getByRole('gridcell', { name: '2', exact: true }).click();
    await page.getByRole('spinbutton').click();
    await page.getByRole('spinbutton').press('ControlOrMeta+a');
    await page.getByRole('spinbutton').fill('12');
    await page.locator('div').filter({ hasText: /^Amount:$/ }).click();
    await page.getByRole('button', { name: 'Submit' }).click();
    //EndTest
})




