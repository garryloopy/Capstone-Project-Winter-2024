import { test } from "@playwright/test";
import { POST } from "../../app/api/pay/route.js";

test.describe("POST Function Tests", () => {
  test("Creates payment and order successfully", async () => {
    // Mocking the request object
    const req = {
      json: async () => ({
        sourceId: "source_id",
        clientInfo: { name: "John Doe", email: "jogn@example.com" },
        cartProducts: [
          { productId: "product1", quantity: 2 },
          { productId: "product2", quantity: 1 },
        ],
        totalPricePlusDelivery: 50,
      }),
    };

    // Mocking the response object
    const res = {
      // Defining a send method to capture the sent data
      send: async (data) => {
        res.sentData = data;
      },
      // Initializing sentData property as undefined
      sentData: undefined,
    };

    // Invoking the POST function with the mocked request and response objects
    await POST(req, res);
  });
});
