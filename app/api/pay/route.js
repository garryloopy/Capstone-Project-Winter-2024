import { Client } from "square";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import Menu from "@/app/models/Menu";
import { connectToDB } from "@/app/utils/DB-connect";

BigInt.prototype.toJSON = function () {
  return this.toString();
};

const { paymentsApi } = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: "sandbox",
});

export async function POST(req, res) {
  try {
    const { sourceId, clientInfo, cartProducts } = await req.json();
    await connectToDB();

    let productPrice;
    let paid;
    let orderId;

    //calculate the total price
    for (const product of cartProducts) {
      const productDB = await Menu.findById(product._id);
      productPrice = parseFloat(productDB?.price.replace(/[$,]/g, ""));

      if (product?.sizes) {
        const size = productDB?.sizes?.find(
          (size) => size._id.toString() === product?.sizes?._id.toString()
        );
        productPrice += size.price;
      }

      if (product?.extra?.length > 0) {
        for (const extra of product.extra) {
          const extraPrice = productDB?.extra?.find(
            (extra) => extra._id.toString() === extra._id.toString()
          );
          productPrice += extraPrice.price;
        }
      }
    }

    const { result } = await paymentsApi.createPayment({
      idempotencyKey: randomUUID(),
      sourceId: sourceId,
      amountMoney: {
        currency: "CAD",
        amount: productPrice * 100,
      },
    });
    orderId = result.payment.orderId;
    paid = result.payment.status;

     

    return new NextResponse(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new NextResponse(
      "An error occurred while retrieving data." + error,
      { status: 500 }
    );
  }
}
