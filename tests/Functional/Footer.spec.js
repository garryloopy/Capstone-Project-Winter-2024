import { test, expect } from "@playwright/test";

test("Footer content functionality", async ({ page }) => {
  await page.goto("http://localhost:3000");

  // Waiting for the footer element to appear
  const footer = await page.waitForSelector(".bg-slate-700");

  // Asserting that the footer element is not null
  expect(footer).not.toBeNull();

  // Finding the copyright text within the footer element
  const copyrightText = await footer.innerText(
    'span:has-text("Miggy\'s Munchies")'
  );

  // Asserting that the copyright text contains the copyright symbol (©️)
  expect(copyrightText).toContain("©️");
});
