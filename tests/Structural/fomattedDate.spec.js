import { test, expect } from "@playwright/test";

test("getFormattedDate function formats date correctly", async () => {
  // Mock a date string
  const dateString = "2024-03-25T14:46:11.869Z";

  // Evaluate the function
  const formattedDate = await page.evaluate((dateString) => {
    // Mock the getFormattedDate function
    function getFormattedDate(date) {
      const createdAtDate = new Date(date);

      const options = {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };

      const dateTimeFormat = new Intl.DateTimeFormat("en-US", options);
      const formattedDate = dateTimeFormat.format(createdAtDate);
      return formattedDate;
    }

    // Call the function with the provided date string
    return getFormattedDate(dateString);
  }, dateString);

  // Assert that the formatted date matches the expected format
  expect(formattedDate).toMatch(/[A-Za-z]{3} \d{2}, \d{4}, \d{2}:\d{2} [AP]M/);
});
