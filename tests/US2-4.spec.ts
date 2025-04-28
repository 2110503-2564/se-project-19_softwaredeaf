import {test,expect} from "playwright/test"

test.use({ storageState: 'storage/storageState-karn2.json' });

test('',async({page})=>{
    page.goto("http://localhost:3000/campground/680f247c155842edd2567797")
    await page.getByText('Edit').click();
  await page.getByText('+').click();
  await page.getByRole('textbox', { name: 'AmenityName Description' }).click();
  await page.getByRole('textbox', { name: 'AmenityName Description' }).fill('Super Picnic Table');
  await page.locator('div').filter({ hasText: /^Description$/ }).locator('#outlined-basic').click();
  await page.locator('div').filter({ hasText: /^Description$/ }).locator('#outlined-basic').fill('A powerful picnic table for family');
  await page.getByRole('spinbutton').first().click();
  await page.getByRole('spinbutton').first().fill('010');
  await page.getByRole('spinbutton').nth(1).click();
  await page.getByRole('spinbutton').nth(1).fill('015');
  await page.getByRole('spinbutton').first().dblclick();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Add Amenity' }).click();
  await page.waitForURL("http://localhost:3000/campground/680f247c155842edd2567797")
  
})

test("UC2-4-1",async({page})=>{
    await page.goto("http://localhost:3000/campground/680f247c155842edd2567797")
    page.on("dialog", async (dialog) => {
        console.log("Dialog message:", dialog.message()); // ดึงข้อความจาก dialog
        expect(dialog.message()).toContain("Delete Super Picnic Table!"); // ตรวจสอบข้อความ
        await dialog.dismiss(); // ปิด dialog
      });
    await page.getByText('Edit').click();
    await page.getByRole('button', { name: 'Delete', exact: true }).click();
    await page.getByRole('button', { name: 'Save' }).click();
})

test("UC2-4-2",async({page})=>{
    
    await page.goto("http://localhost:3000/campground/680f247c155842edd2567797");
    await expect(page.getByText('Super Picnic Table')).not.toBeVisible();

})

//ยังพังอยู่