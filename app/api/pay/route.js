import { Client } from "square";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import Menu from "@/app/models/Menu";
import { connectToDB } from "@/app/utils/DB-connect";
import Order from "@/app/models/Order";

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
    let cardBrand;
    let lastFourDigits;
    let paymentId;
   

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
    paymentId = result.payment.id;
    paid = result.payment.status;
    cardBrand = result.payment.cardDetails.card.cardBrand;
    lastFourDigits = result.payment.cardDetails.card.last4;

    const orderItems = await Order.create({
      orderId,
      paymentId,
      paid,
      cardBrand,
      lastFourDigits,
      clientInfo,
      cartProducts,
      paid,
    });
    return new NextResponse(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new NextResponse("Payment is failed." + error, { status: 500 });
  }
}
