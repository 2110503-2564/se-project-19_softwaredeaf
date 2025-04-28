import { test, expect } from '@playwright/test';

test('Campground Owner Creating Campground', async ({ page }) => {
  test.setTimeout(120000); //เครื่องผมอืด
  // ---------- Login ----------
await page.goto('http://localhost:3000/');
await page.getByRole('link', { name: 'Sign-in' }).click();
await page.locator('input[type="email"]').fill('karn2@gmail.com');
await page.locator('input[type="password"]').fill('123456');
await page.getByRole('button', { name: 'Sign In' }).click();

// ---------- Delete old campground if exists ----------
await page.getByRole('link', { name: 'My Campgrounds' }).click();
if ((await page.content()).includes('CampgroundTest')) {
  await page.getByRole('link', { name: /CampgroundTest/ }).click();
  await page.locator('button', { hasText: 'Edit' }).nth(0).click(); // คลิกปุ่มแรก

  page.once('dialog', dialog => dialog.dismiss().catch(() => {}));
  await page.getByRole('button', { name: 'Delete Campground' }).click();
  await page.getByRole('link', { name: 'My Campgrounds' }).click();
}

// ---------- Create new campground ----------
await page.getByRole('button', { name: 'Add Campground' }).click();
await expect(page.getByRole('heading', { name: 'Create New Campground' })).toBeVisible(); // หรือ header ที่มี
await page.getByRole('textbox', { name: 'Name' ,exact : true}).fill('CampgroundTest');

await page.getByRole('textbox', { name: 'Address' }).fill('aalsjd');
await page.getByRole('textbox', { name: 'District' }).fill('ljfalkjf');
await page.getByRole('textbox', { name: 'Province' }).fill('adlkfjsdlkjf');
await page.getByRole('textbox', { name: 'Postalcode' }).fill('12312');
await page.getByRole('textbox', { name: 'Region' }).fill('akjldkas');
await page.getByRole('textbox', { name: 'Telephone' }).fill('012-356-7321');

// ---------- Submit and check ----------
page.once('dialog', dialog => {
  console.log(`Dialog message: ${dialog.message()}`);
  dialog.dismiss().catch(() => {}); // ถ้าต้องการ dismiss dialog หลังจากดึงข้อความ
});

await page.getByRole('button', { name: 'Create' }).click();
await page.waitForURL(/http:\/\/localhost:3000\/campground\/.*/);
await expect(page.getByText('012-356-7321')).toBeVisible();


});