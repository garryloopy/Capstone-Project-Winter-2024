import { NextResponse } from "next/server";
import { connectToDB } from "@/app/utils/DB-connect";
import Order from "@/app/models/Order";

import getFormattedDate from "@/app/(admin)/utils/getFormattedDate";

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(req) {
  let clientInfo;
  let formattedDate;
  let cartProducts;
  let orderId;
  let cardBrand;
  let lastDigits;

  const getOrderInfo = async (paymentId) => {
    try {
      await connectToDB();
      const order = await Order.find({ paymentId });
      //format the date of order
      const createdAtDate = getFormattedDate(order[0]?.createdAt);

      formattedDate = createdAtDate;
      clientInfo = order[0]?.clientInfo;
      cartProducts = order[0]?.cartProducts;
      orderId = order[0]?.orderId;
      cardBrand = order[0]?.cardBrand;
      lastDigits = order[0]?.lastFourDigits;

      console.log(formattedDate);
      console.log(clientInfo);
      console.log(cartProducts);
      console.log(orderId);
      console.log(cardBrand);
      console.log(lastDigits);
    } catch (error) {
      console.log("Error fetching order info:", error);
    }
  };

  try {
    const data = await req.json();
    const paymentId = data.paymentId;
    await getOrderInfo(paymentId);

    const customerMailOptions = {
      from: process.env.EMAIL_USER,
      to: data.email,
      subject: `Miggy's Munchies Order Received`,
      html: `
      <section style="max-width: 32rem; margin: 0 auto; padding: 1rem; font-family: Arial, sans-serif; border: 1px solid #ccc; border-radius: 8px;">
        <div style="text-align: center; padding-bottom: 1rem;">
          <h2 style="color: #374151; font-size: 1.5rem; font-weight: 600; margin-bottom: 0.5rem;">
            Thank you.
          </h2>
          <p style="color: #6B7280; font-size: 1rem; margin: 0;">
            We have received your order and we will send you regular updates regarding your order.
          </p>
        </div>
        <div style="padding-bottom: 1rem; border-bottom: 1px solid #ccc;">
          <h3 style="color: #374151; font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem;">Contact Information:</h3>
          <p style="color: #6B7280; font-size: 1rem; margin: 0;">
            <strong>Name:</strong> <span style="color: #4B5563;">${data.name}</span>
          </p>
          <p style="color: #6B7280; font-size: 1rem; margin: 0;">
            <strong>Phone Number:</strong> <span style="color: #4B5563;">${data.phoneNumber}</span>
          </p>
          <p style="color: #6B7280; font-size: 1rem; margin: 0;">
            <strong>Email Address:</strong> <span style="color: #4B5563;">${data.email}</span>
          </p>
        </div>
        <div style="padding-top: 1rem;">
          <h3 style="color: #374151; font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem;">Message:</h3>
          <p style="color: #6B7280; font-size: 1rem; margin: 0;">
            ${data.message}
          </p>
        </div>
      </section>
    `,
    };

    // transporter.sendMail(customerMailOptions);
    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error sending email:", error);
    return NextResponse.json(
      { message: "Error sending email" },
      { status: 500 }
    );
  }
}
