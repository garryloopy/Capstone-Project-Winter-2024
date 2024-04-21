import { test, expect } from "@playwright/test";

test.describe("Component performance", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/menu");
  });

  // Defining a test within the suite named "Menu component renders efficiently"
  test("Menu component renders efficiently", async ({ page }) => {
    // Recording the start time before waiting for the menu section to render
    const startTime = Date.now();

    // Waiting for the menu section to appear on the page
    await page.waitForSelector("section.mt-32");

    // Recording the end time after the menu section renders
    const endTime = Date.now();
    // Calculating the elapsed time in milliseconds
    const elapsedTime = endTime - startTime;

    // Asserting that the elapsed time is less than or equal to 5000 milliseconds (5 seconds)
    expect(elapsedTime).toBeLessThanOrEqual(5000);
  });
});
