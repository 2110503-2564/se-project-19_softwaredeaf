import { test, expect } from "playwright/test"
test.use({ storageState: 'storage/storageState-karn2.json' });

test('UC2-5-1', async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('http://localhost:3000/campground/680f247c155842edd2567797')
    await page.getByText('Edit').click();
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Edit' }).first().click();
    page.on("dialog", async (dialog) => {
        console.log("Dialog message:", dialog.message()); // ดึงข้อความจาก dialog
        expect(dialog.message()).toContain("Please fill Amenity Name"); // ตรวจสอบข้อความ
        await dialog.dismiss(); // ปิด dialog
    });

    await page.locator('#outlined-basic').first().click();
    await page.locator('#outlined-basic').first().press('ControlOrMeta+a');
    await page.locator('#outlined-basic').first().fill('');
    await page.locator('#outlined-basic').nth(1).click();
    await page.locator('#outlined-basic').nth(1).press('ControlOrMeta+a');
    await page.locator('#outlined-basic').nth(1).fill('An old wooden classic guitar');
    await page.getByRole('spinbutton').first().click();
    await page.getByRole('spinbutton').first().dblclick();
    await page.getByRole('spinbutton').first().fill('3');
    await page.getByRole('spinbutton').nth(1).dblclick();
    await page.getByRole('spinbutton').nth(1).fill('0');
    await page.getByRole('button', { name: 'Delete' }).first().click();


})

test('UC2-5-2', async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('http://localhost:3000/campground/680f247c155842edd2567797')
    await page.getByText('Edit').click();
    await page.waitForTimeout(500);
    await page.getByRole('button', { name: 'Edit' }).first().click();
    page.on("dialog", async (dialog) => {
        console.log("Dialog message:", dialog.message()); // ดึงข้อความจาก dialog
        expect(dialog.message()).toContain("Please fill Amenity Aescription"); // ตรวจสอบข้อความ
        await dialog.dismiss(); // ปิด dialog
    });

    await page.locator('#outlined-basic').first().click();
    await page.locator('#outlined-basic').first().press('ControlOrMeta+a');
    await page.locator('#outlined-basic').first().fill('Guitar');
    await page.locator('#outlined-basic').nth(1).click();
    await page.locator('#outlined-basic').nth(1).press('ControlOrMeta+a');
    await page.locator('#outlined-basic').nth(1).fill('');
    await page.getByRole('spinbutton').first().click();
    await page.getByRole('spinbutton').first().dblclick();
    await page.getByRole('spinbutton').first().fill('3');
    await page.getByRole('spinbutton').nth(1).dblclick();
    await page.getByRole('spinbutton').nth(1).fill('150');
    const fileInput = page.locator('input[type="file"]').nth(1);
    await fileInput.setInputFiles("tests/assets/PicnicTable.jpg");
    await page.getByRole('button', { name: 'Delete' }).first().click();


})
test('UC2-5-3', async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('http://localhost:3000/campground/680f247c155842edd2567797')
    await page.getByText('Edit').click();
    await page.waitForTimeout(500);
    await page.getByRole('button', { name: 'Edit' }).first().click();
    page.on("dialog", async (dialog) => {
        console.log("Dialog message:", dialog.message()); // ดึงข้อความจาก dialog
        expect(dialog.message()).toContain("Update Amenity!"); // ตรวจสอบข้อความ
        await dialog.dismiss(); // ปิด dialog
    });

    await page.locator('#outlined-basic').first().click();
    await page.locator('#outlined-basic').first().press('ControlOrMeta+a');
    await page.locator('#outlined-basic').first().fill('Guitar');
    await page.locator('#outlined-basic').nth(1).click();
    await page.locator('#outlined-basic').nth(1).press('ControlOrMeta+a');
    await page.locator('#outlined-basic').nth(1).fill('An old wooden classic guitar');
    await page.getByRole('spinbutton').first().click();
    await page.getByRole('spinbutton').first().dblclick();
    await page.getByRole('spinbutton').first().fill('3');
    await page.getByRole('spinbutton').nth(1).dblclick();
    await page.getByRole('spinbutton').nth(1).fill('150');
    await page.getByRole('button', { name: 'Delete' }).first().click();


})
test('UC2-5-4', async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('http://localhost:3000/campground/680f247c155842edd2567797')
    await page.getByText('Edit').click();
    await page.waitForTimeout(500);
    await page.getByRole('button', { name: 'Edit' }).first().click();
    page.on("dialog", async (dialog) => {
        console.log("Dialog message:", dialog.message()); // ดึงข้อความจาก dialog
        expect(dialog.message()).toContain("Please fill Amenity Amount"); // ตรวจสอบข้อความ
        await dialog.dismiss(); // ปิด dialog
    });

    await page.locator('#outlined-basic').first().click();
    await page.locator('#outlined-basic').first().press('ControlOrMeta+a');
    await page.locator('#outlined-basic').first().fill('Guitar');
    await page.locator('#outlined-basic').nth(1).click();
    await page.locator('#outlined-basic').nth(1).press('ControlOrMeta+a');
    await page.locator('#outlined-basic').nth(1).fill('An old wooden classic guitar');
    await page.getByRole('spinbutton').first().click();
    await page.getByRole('spinbutton').first().dblclick();
    await page.getByRole('spinbutton').first().fill('0');
    await page.getByRole('spinbutton').nth(1).dblclick();
    await page.getByRole('spinbutton').nth(1).fill('0');
    await page.getByRole('button', { name: 'Delete' }).first().click();


})
test('UC2-5-5', async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('http://localhost:3000/campground/680f247c155842edd2567797')
    await page.getByText('Edit').click();
    await page.waitForTimeout(500);
    await page.getByRole('button', { name: 'Edit' }).first().click();
    page.on("dialog", async (dialog) => {
        console.log("Dialog message:", dialog.message()); // ดึงข้อความจาก dialog
        expect(dialog.message()).toContain("Please fill Amenity Price"); // ตรวจสอบข้อความ
        await dialog.dismiss(); // ปิด dialog
    });

    await page.locator('#outlined-basic').first().click();
    await page.locator('#outlined-basic').first().press('ControlOrMeta+a');
    await page.locator('#outlined-basic').first().fill('Guitar');
    await page.locator('#outlined-basic').nth(1).click();
    await page.locator('#outlined-basic').nth(1).press('ControlOrMeta+a');
    await page.locator('#outlined-basic').nth(1).fill('An old wooden classic guitar');
    await page.getByRole('spinbutton').first().click();
    await page.getByRole('spinbutton').first().dblclick();
    await page.getByRole('spinbutton').first().fill('3');
    await page.getByRole('spinbutton').nth(1).dblclick();
    await page.getByRole('spinbutton').nth(1).fill('0');
    const fileInput = page.locator('input[type="file"]').nth(1);
    await fileInput.setInputFiles("tests/assets/PicnicTable.jpg");
    await page.getByRole('button', { name: 'Delete' }).first().click();


})
test('UC2-5-6', async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('http://localhost:3000/campground/680f247c155842edd2567797')
    await page.getByText('Edit').click();
    await page.waitForTimeout(500);
    await page.getByRole('button', { name: 'Edit' }).first().click();
    page.on("dialog", async (dialog) => {
        console.log("Dialog message:", dialog.message()); // ดึงข้อความจาก dialog
        expect(dialog.message()).toContain("Update Amenity!"); // ตรวจสอบข้อความ
        await dialog.dismiss(); // ปิด dialog
    });

    await page.locator('#outlined-basic').first().click();
    await page.locator('#outlined-basic').first().press('ControlOrMeta+a');
    await page.locator('#outlined-basic').first().fill('Guitar');
    await page.locator('#outlined-basic').nth(1).click();
    await page.locator('#outlined-basic').nth(1).press('ControlOrMeta+a');
    await page.locator('#outlined-basic').nth(1).fill('An old wooden classic guitar');
    await page.getByRole('spinbutton').first().click();
    await page.getByRole('spinbutton').first().dblclick();
    await page.getByRole('spinbutton').first().fill('3');
    await page.getByRole('spinbutton').nth(1).dblclick();
    await page.getByRole('spinbutton').nth(1).fill('150');
    await page.getByRole('button', { name: 'Delete' }).first().click();


})