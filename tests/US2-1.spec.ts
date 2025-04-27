import { test, expect } from '@playwright/test';

test.describe('Precondition for multiple tests', () => {
    let mypage;

    test.beforeEach(async({ page }) => {
        await page.goto('http://localhost:3000');
        await page.getByRole('link', { name: 'Sign-in' }).click();
        mypage = await page.content();  
    });

    test('TC2-1-1', async () => {
        // Test
        await expect(mypage).toContain("Home"); 
    });

    
});
