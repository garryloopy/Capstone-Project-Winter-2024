import { test, expect } from "@playwright/test";
import { POST } from "../../app/api/pay/route.js";
import { globalAgent } from "http";

test.describe("POST Function Tests", () => {
  test("Creates payment and order successfully", async () => {
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

    const res = {
      send: async (data) => {
        res.sentData = data;
      },
      sentData: undefined,
    };

    const createPaymentMock = async () => ({
      result: {
        payment: {
          orderId: "order_id",
          id: "payment_id",
          status: "COMPLETED",
          cardDetails: { card: { cardBrand: "VISA", last4: "1111" } },
        },
      },
    });

    await POST(req, res);
  });
});
