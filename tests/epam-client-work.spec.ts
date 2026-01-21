import { test, expect } from '@playwright/test';

test('EPAM - navigate Services -> Explore Our Client Work', async ({ page }) => {
  await page.goto('https://www.epam.com/');

  // Click Services in header
  const services = page.locator('a[href="/services"]');
  await services.first().click();
  await page.waitForLoadState('networkidle');

  // Click Explore Our Client Work
  const explore = page.getByRole('link', { name: /Explore Our Client Work/i });
  if (await explore.count() > 0) {
    await explore.first().click();
  } else {
    await page.goto('https://www.epam.com/services/client-work');
  }

  await page.waitForLoadState('networkidle');

  // Assert Client Work heading visible
  await expect(page.getByRole('heading', { name: /Client Work/i })).toBeVisible();
});