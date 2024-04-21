import { test, expect } from "@playwright/test";
import MenuScroll from "../../components/MenuScroll";

test("Scrolled state correctly", async ({ page }) => {
  await page.goto("http://localhost:3000");

  // Waiting for 1000 milliseconds (1 second)
  await page.waitForTimeout(1000);

  // Exposing the MenuScroll function to the browser context
  await page.exposeFunction("MenuScroll", MenuScroll);

  // Evaluating and retrieving the current scroll position (scrollY)
  const scrollY = await page.evaluate(() => {
    return window.scrollY;
  });

  // Asserting that the scroll position (scrollY) is at the top (0)
  expect(scrollY).toBe(0);
});
