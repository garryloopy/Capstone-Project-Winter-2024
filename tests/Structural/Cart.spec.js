import { test, expect } from "@playwright/test";

test("Rendering inspection", async ({ page }) => {
  await page.goto("http://localhost:3000/cart");

  // Waiting for the backdrop element to appear
  await page.waitForSelector(".backdrop-contrast-75");
  // Asserting that the backdrop element is visible
  expect(await page.isVisible(".backdrop-contrast-75")).toBeTruthy();
});

test("Error message for incomplete client info", async ({ page }) => {
  await page.goto("http:localhost:3000/cart");

  // Waiting for the backdrop element to appear
  await page.waitForSelector(".backdrop-contrast-75");

  // Waiting for the error message element to appear with a timeout of 5000 milliseconds
  await page.waitForSelector(".bg-yellow-400", { timeout: 5000 });

  // Waiting for the payment success message element to appear with a timeout of 5000 milliseconds
  await page.waitForSelector(".payment-success", { timeout: 5000 });

  // Asserting that the payment success message element is visible
  expect(await page.isVisible(".payment-success")).toBeTruthy();
});
