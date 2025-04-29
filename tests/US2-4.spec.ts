import { test, expect } from "@playwright/test";

test.use({ storageState: 'storage/storageState-banksuper.json' });

test.describe.serial('Super Picnic Table Flow', () => {

  test('delete all amenities before starting test',async({page})=>{
    await page.goto('http://localhost:3000/campground/6810f03c3b2dd4097295b852/edit');
    await page.waitForTimeout(3000);
    while (await page.getByRole('button', { name: 'Delete', exact: true }).first().isVisible()) {
      await page.getByRole('button', { name: 'Delete', exact: true }).first().click();
      await page.waitForTimeout(500); 
    }
    await page.getByRole('button', { name: 'Save' }).click();
    await page.waitForURL('http://localhost:3000/campground/6810f03c3b2dd4097295b852');

  })

  test('create Super Picnic Table', async ({ page }) => {
    test.setTimeout(60000);
    await page.goto("http://localhost:3000/campground/6810f03c3b2dd4097295b852");
    await page.getByRole('button', { name: 'Edit' }).click();
    await page.getByText('+').click();
    await page.getByRole('textbox', { name: 'AmenityName Description' }).fill('Super Picnic Table');
    await page.locator('div').filter({ hasText: /^Description$/ }).locator('#outlined-basic').fill('wow');
    await page.getByRole('spinbutton').first().fill('010');
    await page.getByRole('spinbutton').nth(1).fill('015');
    page.once('dialog', dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });
    await page.getByRole('button', { name: 'Add Amenity' }).click();
    await page.getByRole('button', { name: 'Save' }).click();
    await page.waitForURL('http://localhost:3000/campground/6810f03c3b2dd4097295b852');
  });

  test('US2-4-1', async ({ page }) => {
    page.on("dialog", async (dialog) => {
      console.log("Dialog message:", dialog.message());
      expect(dialog.message()).toContain("Delete Super Picnic Table!");
      await dialog.dismiss();
    });
    await page.goto('http://localhost:3000/campground/6810f03c3b2dd4097295b852');
    await page.getByRole('button', { name: 'Edit' }).click();
    await page.getByRole('button', { name: 'Delete', exact: true }).click();
    await page.getByRole('button', { name: 'Save' }).click();
    await page.waitForURL('http://localhost:3000/campground/6810f03c3b2dd4097295b852');
  });

  test('US2-4-2', async ({ page }) => {
    await page.goto('http://localhost:3000/campground/6810f03c3b2dd4097295b852');
    await expect(page.getByText(`Super Picnic Table`).nth(0)).not.toBeVisible();
  });

});
