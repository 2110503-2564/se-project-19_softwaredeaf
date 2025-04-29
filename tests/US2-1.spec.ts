import { test, expect } from "playwright/test";

test.use({ storageState: 'storage/storageState-karn2.json' });

test("UC2-1-1", async ({ page }) => {
  test.setTimeout(60000);
  await page.goto("http://localhost:3000/campground");
  await page.getByText('CampgroundForTest').click();
  await page.getByText("Edit").click();
  page.on("dialog", async (dialog) => {
    console.log("Dialog message:", dialog.message()); // ดึงข้อความจาก dialog
    expect(dialog.message()).toContain("add amenity successfully"); // ตรวจสอบข้อความ
    await dialog.dismiss(); // ปิด dialog
  });
  await page.getByText('+').click();
  await page.getByRole('textbox', { name: 'AmenityName Description' }).click();
  await page.getByRole('textbox', { name: 'AmenityName Description' }).fill('Picnic Table');
  await page.locator('div').filter({ hasText: /^Description$/ }).locator('#outlined-basic').click();
  await page.locator('div').filter({ hasText: /^Description$/ }).locator('#outlined-basic').fill('A sturdy outdoor table with benches');
  const fileInput = page.locator('input[type="file"]').nth(1); 
  await fileInput.setInputFiles("tests/assets/PicnicTable.jpg");
  await page.getByRole("spinbutton").first().click();
  await page.getByRole("spinbutton").first().fill("10");
  await page.getByRole("spinbutton").nth(1).click();
  await page.getByRole("spinbutton").nth(1).fill("15");
  
  

  await page.getByRole("button", { name: "Add Amenity" }).click();
});

test("UC2-1-2", async ({ page }) => {
  test.setTimeout(60000);
  await page.goto("http://localhost:3000/campground");
  await page.getByText('CampgroundForTest').click();
  await page.getByText("Edit").click();
  page.on("dialog", async (dialog) => {
    console.log("Dialog message:", dialog.message()); // ดึงข้อความจาก dialog
    expect(dialog.message()).toContain("Please insert amenity name"); // ตรวจสอบข้อความ
    await dialog.dismiss(); // ปิด dialog
  });
  await page.getByText('+').click();
  await page.getByRole('textbox', { name: 'AmenityName Description' }).click();
  await page.getByRole('textbox', { name: 'AmenityName Description' }).fill('');
  await page.locator('div').filter({ hasText: /^Description$/ }).locator('#outlined-basic').click();
  await page.locator('div').filter({ hasText: /^Description$/ }).locator('#outlined-basic').fill('A sturdy outdoor table with benches');
  const fileInput = page.locator('input[type="file"]').nth(1); 
  await fileInput.setInputFiles("tests/assets/PicnicTable.jpg");
  await page.getByRole("spinbutton").first().click();
  await page.getByRole("spinbutton").first().fill("10");
  await page.getByRole("spinbutton").nth(1).click();
  await page.getByRole("spinbutton").nth(1).fill("15");
  
  

  await page.getByRole("button", { name: "Add Amenity" }).click();
});

test("UC2-1-3", async ({ page }) => {
  test.setTimeout(60000);
  await page.goto("http://localhost:3000/campground");
  await page.getByText('CampgroundForTest').click();
  await page.getByText("Edit").click();
  page.on("dialog", async (dialog) => {
    console.log("Dialog message:", dialog.message()); // ดึงข้อความจาก dialog
    expect(dialog.message()).toContain("Please fill in amenity description"); // ตรวจสอบข้อความ
    await dialog.dismiss(); // ปิด dialog
  });
  await page.getByText('+').click();
  await page.getByRole('textbox', { name: 'AmenityName Description' }).click();
  await page.getByRole('textbox', { name: 'AmenityName Description' }).fill('Picnic Table');
  await page.locator('div').filter({ hasText: /^Description$/ }).locator('#outlined-basic').click();
  await page.locator('div').filter({ hasText: /^Description$/ }).locator('#outlined-basic').fill('');
  const fileInput = page.locator('input[type="file"]').nth(1); 
  await fileInput.setInputFiles("tests/assets/PicnicTable.jpg");
  await page.getByRole("spinbutton").first().click();
  await page.getByRole("spinbutton").first().fill("10");
  await page.getByRole("spinbutton").nth(1).click();
  await page.getByRole("spinbutton").nth(1).fill("15");
  
  

  await page.getByRole("button", { name: "Add Amenity" }).click();
});

test("UC2-1-4", async ({ page }) => {
  test.setTimeout(60000);
  await page.goto("http://localhost:3000/campground");
  await page.getByText('CampgroundForTest').click();
  await page.getByText("Edit").click();
  page.on("dialog", async (dialog) => {
    console.log("Dialog message:", dialog.message()); // ดึงข้อความจาก dialog
    expect(dialog.message()).toContain("add amenity successfully"); // ตรวจสอบข้อความ
    await dialog.dismiss(); // ปิด dialog
  });
  await page.getByText('+').click();
  await page.getByRole('textbox', { name: 'AmenityName Description' }).click();
  await page.getByRole('textbox', { name: 'AmenityName Description' }).fill('Picnic Table');
  await page.locator('div').filter({ hasText: /^Description$/ }).locator('#outlined-basic').click();
  await page.locator('div').filter({ hasText: /^Description$/ }).locator('#outlined-basic').fill('A sturdy outdoor table with benches');
  await page.getByRole("spinbutton").first().click();
  await page.getByRole("spinbutton").first().fill("10");
  await page.getByRole("spinbutton").nth(1).click();
  await page.getByRole("spinbutton").nth(1).fill("15");
  
  

  await page.getByRole("button", { name: "Add Amenity" }).click();
});

test("UC2-1-5", async ({ page }) => {
  test.setTimeout(60000);
  await page.goto("http://localhost:3000/campground");
  await page.getByText('CampgroundForTest').click();
  await page.getByText("Edit").click();
  page.on("dialog", async (dialog) => {
    console.log("Dialog message:", dialog.message()); // ดึงข้อความจาก dialog
    expect(dialog.message()).toContain("Please insert amenity amount"); // ตรวจสอบข้อความ
    await dialog.dismiss(); // ปิด dialog
  });
  await page.getByText('+').click();
  await page.getByRole('textbox', { name: 'AmenityName Description' }).click();
  await page.getByRole('textbox', { name: 'AmenityName Description' }).fill('Picnic Table');
  await page.locator('div').filter({ hasText: /^Description$/ }).locator('#outlined-basic').click();
  await page.locator('div').filter({ hasText: /^Description$/ }).locator('#outlined-basic').fill('A sturdy outdoor table with benches');
  const fileInput = page.locator('input[type="file"]').nth(1); 
  await fileInput.setInputFiles("tests/assets/PicnicTable.jpg");
  await page.getByRole("spinbutton").nth(1).click();
  await page.getByRole("spinbutton").nth(1).fill("15");
  
  

  await page.getByRole("button", { name: "Add Amenity" }).click();
});

test("UC2-1-6", async ({ page }) => {
  test.setTimeout(60000);
  await page.goto("http://localhost:3000/campground");
  await page.getByText('CampgroundForTest').click();
  await page.getByText("Edit").click();
  page.on("dialog", async (dialog) => {
    console.log("Dialog message:", dialog.message()); // ดึงข้อความจาก dialog
    expect(dialog.message()).toContain("Please insert amenity price"); // ตรวจสอบข้อความ
    await dialog.dismiss(); // ปิด dialog
  });
  await page.getByText('+').click();
  await page.getByRole('textbox', { name: 'AmenityName Description' }).click();
  await page.getByRole('textbox', { name: 'AmenityName Description' }).fill('Picnic Table');
  await page.locator('div').filter({ hasText: /^Description$/ }).locator('#outlined-basic').click();
  await page.locator('div').filter({ hasText: /^Description$/ }).locator('#outlined-basic').fill('A sturdy outdoor table with benches');
  const fileInput = page.locator('input[type="file"]').nth(1); 
  await fileInput.setInputFiles("tests/assets/PicnicTable.jpg");
  await page.getByRole("spinbutton").first().click();
  await page.getByRole("spinbutton").first().fill("10");
  
  

  await page.getByRole("button", { name: "Add Amenity" }).click();
});