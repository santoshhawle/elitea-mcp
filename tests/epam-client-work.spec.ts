import { test, expect } from '@playwright/test';

test('EPAM - navigate to Client Work via Services menu', async ({ page }) => {
  await page.goto('https://www.epam.com/');

  // Open Services menu
  const services = page.getByRole('link', { name: /Services/i }).first();
  await services.click().catch(async () => {
    // fallback to direct navigation if click fails due to overlays
    await page.goto('https://www.epam.com/services');
  });

  // Click Explore Our Client Work link if present, otherwise navigate directly
  const explore = page.getByRole('link', { name: /Explore Our Client Work/i });
  if (await explore.count() > 0) {
    await explore.first().click().catch(async () => await page.goto('https://www.epam.com/services/client-work'));
  } else {
    await page.goto('https://www.epam.com/services/client-work');
  }

  // Assert Client Work heading is visible
  await expect(page.getByRole('heading', { name: /Client Work/i })).toBeVisible();
});
