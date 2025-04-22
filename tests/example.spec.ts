import { test, expect } from '@playwright/test';

test('เช็กว่ามีคำว่า Featured', async ({ page }) => {
  await page.goto('http://localhost:3000', { timeout: 60000 }); 


  
  await expect(page.getByText('Featured campground destinations')).toBeVisible();
  await page.getByText('Sign-in').click();
  await expect(page.getByText('Sign up here')).toBeVisible();

  //Demo Playwright รันโดยการ npx playwright test example.spec.ts
});
