import { test, expect } from "@playwright/test";

test("Header component functionality", async ({ page }) => {
  await page.goto("http://localhost:3000");

  // Finding the logo link in the header
  const logoLink = await page.$('header a[href="/"]');

  // Clicking on the logo link
  await logoLink.click();

  // Asserting that the logo link is not null
  expect(logoLink).not.toBeNull();

  // Finding all navbar links in the header
  const navbarLinks = await page.$$("header nav a");

  // Asserting that the number of navbar links is greater than 0
  expect(navbarLinks.length).toBeGreaterThan(0);

  // Finding the cart icon in the header
  const cartIcon = await page.$('header [href="/cart"]');

  // Clicking on the cart icon
  await cartIcon.click();

  // Asserting that the cart icon is not null
  expect(cartIcon).not.toBeNull();
});
