import { test, expect } from "@playwright/test";

test("Header component functionality", async ({ page }) => {
  await page.goto("http://localhost:3000");

  const logoLink = await page.$('header a[href="/"]');
  await logoLink.click();
  expect(logoLink).not.toBeNull();

  const navbarLinks = await page.$$("header nav a");
  expect(navbarLinks.length).toBeGreaterThan(0);

  const cartIcon = await page.$('header [href="/cart"]');
  await cartIcon.click();
  expect(cartIcon).not.toBeNull();
});
