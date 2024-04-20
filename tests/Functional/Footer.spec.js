import { test, expect } from "@playwright/test";

test("Footer content functionality", async ({ page }) => {
  await page.goto("http://localhost:3000");

  const footer = await page.waitForSelector(".bg-slate-700");
  expect(footer).not.toBeNull();

  const copyrightText = await footer.innerText(
    'span:has-text("Miggy\'s Munchies")'
  );
  expect(copyrightText).toContain("©️");
});
