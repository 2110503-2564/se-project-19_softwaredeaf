import {test,expect} from "playwright/test"

test.use({ storageState: 'storage/storageState-bankbook.json' });

test('US2-3-1',async({page})=>{
    await page.goto("http://localhost:3000");
    await page.getByRole('link', { name: 'My Bookings' }).click();
    await expect(page.getByText(`No Amenity Booked`).nth(0)).toBeVisible();
})

test('US2-3-2',async({page})=>{
    await page.goto("http://localhost:3000");
    await page.getByRole('link', { name: 'My Bookings' }).click();
    await expect(page.getByText(`Guitar`).nth(0)).toBeVisible();
})

