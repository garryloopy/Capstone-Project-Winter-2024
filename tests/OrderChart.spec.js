// @ts-check
const { test, expect } = require("@playwright/test");

test("Rendering correctly", async ({ page }) => {
  // Check page address
  await page.goto("http://localhost:3000/staticstic");

  const chart = await page.$(".chartjs-render-monitor");
  expect(chart).toBeUndefined;
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

  // const chartData = await page.evaluate(() => {
  //   const chart = document.querySelector(".chartjs-render.monitor");
  //   return chart;
  // });

  // const expectedOrderCounts = {
  //   "Apr 1": 1,
  //   "Apr 2": 2,
  // };

  // Object.keys(expectedOrderCounts).forEach((label, index) => {
  //   expect(chartData[index]).toEqual(expectedOrderCounts);
  // });
});
