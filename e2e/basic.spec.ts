import { test, expect } from '@playwright/test';

test('homepage has title and content', async ({ page }) => {
  await page.goto('/');
  
  // Verify the title
  await expect(page).toHaveTitle(/Docs Starter Kit/);
  
  // Verify some content on the page
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('navigation works', async ({ page }) => {
  await page.goto('/');
  
  // Navigate to Getting Started page
  await page.getByRole('link', { name: /getting started/i }).click();
  
  // Verify we're on the Getting Started page
  await expect(page.getByRole('heading', { level: 1, name: /getting started/i })).toBeVisible();
});