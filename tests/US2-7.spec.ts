import { test, expect } from "playwright/test";
test.use({ storageState: "storage/storageState-bankbook3.json" });

test.describe.serial("Amenity Delete Test", () => {
  test("Recreate Booking if it exists", async ({ page }) => {
    await page.goto("http://localhost:3000/mybooking");
    page.once("dialog", (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });
    const deleteButton = page.getByRole("button", { name: "Delete" });

    if (await deleteButton.isVisible()) {
        page.once("dialog", (dialog) => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => {});
          });
      await deleteButton.click();
    }
      await page.getByRole('link', { name: 'Campgrounds' }).click();
      await page.getByRole('link', { name: 'Product Picture CampgroundForTest Testอยู่ 093-888-8888 -' }).click();
      await page.getByRole('button', { name: 'Book Now' }).click();
      await page.getByRole("textbox", { name: "Name Surname" }).click();
      await page
        .getByRole("textbox", { name: "Name Surname" })
        .fill("Test Delete");
      await page.getByRole("textbox", { name: "Name Surname" }).press("Tab");
      await page
        .locator("div")
        .filter({ hasText: /^Surname$/ })
        .locator("#outlined-basic")
        .fill("Amenity");
      await page
        .locator("div")
        .filter({ hasText: /^Start Date$/ })
        .getByLabel("Choose date")
        .click();
      await page.waitForTimeout(500);
      await page.getByRole("button", { name: "Next month" }).click();
      await page.waitForTimeout(500);
      await page.getByRole("gridcell", { name: "1", exact: true }).click();
      await page.waitForTimeout(500);
      await page
        .getByRole("button", { name: "Choose date", exact: true })
        .click();
      await page.waitForTimeout(500);
      await page.getByRole("gridcell", { name: "2", exact: true }).click();
      await page.getByRole("button", { name: "Add" }).first().click();
      await page.getByRole("button", { name: "Choose date" }).nth(2).click();
      await page.waitForTimeout(500);
      await page.getByRole("gridcell", { name: "1", exact: true }).click();
      await page.waitForTimeout(500);
      await page
        .getByRole("button", { name: "Choose date", exact: true })
        .click();
      await page.waitForTimeout(500);
      await page.getByRole("gridcell", { name: "2", exact: true }).click();
      await page.waitForTimeout(500);
      page.once("dialog", (dialog) => {
        console.log(`Dialog message: ${dialog.message()}`);
        dialog.dismiss().catch(() => {});
      });
      await page.getByRole("button", { name: "Submit" }).click();
      page.once("dialog", (dialog) => {
        console.log(`Dialog message: ${dialog.message()}`);
        dialog.dismiss().catch(() => {});
      });
      await page.waitForTimeout(500);
      await page.getByRole("button", { name: "Book" }).click();
      await page.waitForTimeout(500);
    
  });

  test("UC2-7-1", async ({ page }) => {
    page.on("dialog", async (dialog) => {
      console.log("Dialog message:", dialog.message()); // ดึงข้อความจาก dialog
      expect(dialog.message()).toContain("Delete Guitar!"); // ตรวจสอบข้อความ
      await dialog.dismiss(); // ปิด dialog
    });
    await page.goto("http://localhost:3000/mybooking");
    await page.getByRole("button", { name: "Edit" }).click();

    await page.getByRole("button", { name: "Delete" }).click();
  });

  test("UC2-7-2", async ({ page }) => {
    page.on("dialog", async (dialog) => {
      console.log("Dialog message:", dialog.message()); // ดึงข้อความจาก dialog
      expect(dialog.message()).toContain("Delete Guitar!"); // ตรวจสอบข้อความ
      await dialog.dismiss(); // ปิด dialog
    });

    await page.goto("http://localhost:3000/mybooking");

    await expect(page.getByText(`No Amenity Booked`).nth(0)).toBeVisible();
  });
});
