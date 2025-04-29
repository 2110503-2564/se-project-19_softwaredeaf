import { test } from "@playwright/test";
import fs from "fs";

// สร้างโฟลเดอร์ storage ถ้ายังไม่มี
test.beforeAll(() => {
  if (!fs.existsSync('storage')) {
    fs.mkdirSync('storage');
  }
});

const users = [
  { email: 'karn1@gmail.com', password: '123456', file: 'storage/storageState-karn1.json' },
  { email: 'karn2@gmail.com', password: '123456', file: 'storage/storageState-karn2.json' },
  { email: 'karn3@gmail.com', password: '123456', file: 'storage/storageState-karn3.json' },
  { email: 'bankbook@gmail.com', password: '123456', file: 'storage/storageState-bankbook.json'},
  { email: 'bankbook2@gmail.com', password: '123456', file: 'storage/storageState-bankbook2.json'},
  { email: 'banksuper@gmail.com', password: '123456', file: 'storage/storageState-banksuper.json'},
];

for (const user of users) {
  test(`login and save storage state for ${user.email}`, async ({ page }) => {
    await page.goto("http://localhost:3000");
    await page.getByRole("link", { name: "Sign-in" }).click();
    await page.locator('input[type="email"]').fill(user.email);
    await page.locator('input[type="password"]').fill(user.password);
    await page.getByRole("button", { name: "Sign In" }).click();
    await page.waitForURL("http://localhost:3000/");
    await page.context().storageState({ path: user.file });
  });
}
