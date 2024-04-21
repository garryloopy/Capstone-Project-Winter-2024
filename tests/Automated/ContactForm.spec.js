import { test, expect } from "@playwright/test";

test("Contact form submission", async ({ page }) => {
  // Navigating to the contact page
  await page.goto("http://localhost:3000/contact");

  // Filling out form fields with predefined values
  await page.fill("#firstName", "Joe");
  await page.fill("#lastName", "Doe");
  await page.fill("#email", "joedoe@gmail.com");
  await page.fill("#phoneNumber", "123-456-7890");
  await page.fill("#messageBox", "Automation Test");

  // Clicking on the submit button
  await page.click('button[type="submit"]');

  // Waiting for the confirmation message element to appear
  await page.waitForSelector("[data-confirmation=true]");

  // Waiting for the confirmation message element to appear again (just in case)
  const confirmationElement = await page.waitForSelector(
    "[data-confirmation=true]"
  );

  // Asserting that the confirmation element exists
  expect(confirmationElement).toBeTruthy();
});
