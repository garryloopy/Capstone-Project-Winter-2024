import { test, expect } from "@playwright/test";

test("Menu search updated correctly", async ({ page }) => {
  // Navigate to menu page
  await page.goto("http://localhost:3000/menu");

  // Wait for the input field to be visible
  await page.waitForSelector("input[type='text']");

  // Enter search query
  const searchQuery = "Pizza";
  await page.fill("input[type='text']", searchQuery);

  // Check if the input field has the correct value
  const inputValue = await page.$eval(
    "input[type='text']",
    (input) => input.value
  );
  expect(inputValue).toBe(searchQuery);

  //Get the text content of all displayed menu items
  const menuItems = await page.$$(".ClientMenu");
  const menuTitles = await Promise.all(
    menuItems.map((item) => item.textContent())
  );

  // Verify that each menu item contains the search query
  const searchQueryLowercase = searchQuery.toLowerCase();
  const allMenuItemsContainSearchQuery = menuTitles.every((title) =>
    title.toLowerCase().includes(searchQueryLowercase)
  );
  expect(allMenuItemsContainSearchQuery).toBeTruthy();
});
