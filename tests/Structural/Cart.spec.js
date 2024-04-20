import { test, expect } from "@playwright/test";

test("Rendering inspection", async ({ page }) => {
  await page.goto("http://localhost:3000/cart");

  await page.waitForSelector(".backdrop-contrast-75");
  expect(await page.isVisible(".backdrop-contrast-75")).toBeTruthy();
});

test("Error message for incomplete client info", async ({ page }) => {
  await page.goto("http:localhost:3000/cart");

  await page.waitForSelector(".backdrop-contrast-75");

  await page.waitForSelector(".bg-yellow-400", { timeout: 5000 });

  await page.waitForSelector(".payment-success", { timeout: 5000 });

  expect(await page.isVisible(".payment-success")).toBeTruthy();
});
