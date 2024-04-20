import { test, expect } from "@playwright/test";

test("OrderConfirmationPage renders correctly", async ({ page }) => {
  // Mock necessary data and functions
  const mockClientInfo = {
    /* Mocked clientInfo */
  };
  const mockCartProducts = [
    /* Mocked cartProducts */
  ];
  const mockFormattedDate = "Mar 25, 2024, 08:46 AM"; // Mocked formatted date
  const mockCardBrand = "Visa";
  const mockLastDigits = "1234";
  const mockOrderId = "ABC123";
  const mockDeliveryType = "delivery";

  // Mock the response from the API
  page.route("/api/getOrder", async (route) => {
    await route.fulfill({
      status: 200,
      body: JSON.stringify([
        {
          clientInfo: mockClientInfo,
          cartProducts: mockCartProducts,
          formattedDate: mockFormattedDate,
          cardBrand: mockCardBrand,
          lastFourDigits: mockLastDigits,
          orderId: mockOrderId,
          deliveryType: mockDeliveryType,
        },
      ]),
    });
  });

  // Navigate to the OrderConfirmationPage
  await page.goto("http://localhost:3000/receipt");

  // Wait for the loading indicator to disappear
  await page.waitForSelector(".loading", { state: "hidden" });

  // Verify that the receipt header is displayed
  expect(await page.innerText(".sub-header")).toContain("Receipt");

  // Verify that the total price is displayed correctly
  expect(await page.innerText(".total-price")).toContain("$123.45"); // Replace with your actual total price

  // Verify that the order details are displayed
  expect(await page.innerText(".order-details")).toContain(mockFormattedDate);
  expect(await page.innerText(".order-details")).toContain(mockOrderId);
  expect(await page.innerText(".order-details")).toContain(
    `${mockCardBrand} xxxxxxxxxxxx${mockLastDigits}`
  );

  // Verify that the contact information is displayed
  expect(await page.innerText(".billing-address")).toContain(
    "Contact Information"
  );
});
