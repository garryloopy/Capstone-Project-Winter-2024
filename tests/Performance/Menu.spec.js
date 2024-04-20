import { test, expect } from "@playwright/test";

test.describe("Component performance", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/menu");
  });

  test("Menu component renders efficiently", async ({ page }) => {
    const startTime = Date.now();

    await page.waitForSelector("section.mt-32");

    const endTime = Date.now();
    const elapsedTime = endTime - startTime;

    expect(elapsedTime).toBeLessThanOrEqual(5000);
  });
});
