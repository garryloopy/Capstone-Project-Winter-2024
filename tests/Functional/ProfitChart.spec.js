import { test, expect } from "@playwright/test";

test("Check address", async ({ page }) => {
  // Check page address
  await page.goto("http://localhost:3000/staticstic");

  expect("#order-chart").toBeTruthy();
});

test("Automatically resize", async ({ page }) => {
  // Navigate to the OrderChart component
  await page.goto("http://localhost:3000/statistic");

  // Get the initial dimensions of the graph element
  const initialGraphSize = await page.$eval("#order-chart", (graph) => {
    const rect = graph.getBoundingClientRect();
    return { width: rect.width, height: rect.height };
  });

  // Resize the browser window
  await page.setViewportSize({ width: 800, height: 600 });

  // Wait for a brief moment to allow the chart to adjust
  await page.waitForTimeout(1000);

  // Get the new dimensions of the graph element after resizing
  const resizedGraphSize = await page.$eval("#order-chart", (graph) => {
    const rect = graph.getBoundingClientRect();
    return { width: rect.width, height: rect.height };
  });

  // Verify that the width of the graph element has changed
  expect(resizedGraphSize.width).not.toEqual(initialGraphSize.width);

  // Verify that the height of the graph element has changed
  expect(resizedGraphSize.height).not.toEqual(initialGraphSize.height);
});

test("Fetching and displays data correctly", async ({ page }) => {
  // Read mock orders
  const mockOrders = [
    { createdAt: "2024-04-01T12:00:00Z" },
    { createdAt: "2024-04-02T12:00:00Z" },
  ];

  await page.route("**/api/getOrderList", (route) => {
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(mockOrders),
    });
  });
});
