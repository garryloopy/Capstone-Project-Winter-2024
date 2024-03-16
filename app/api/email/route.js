const nodemailer = require("nodemailer");

import { NextResponse } from "next/server";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(req) {
  // console.log(process.env.EMAIL_USER);
  // console.log(process.env.EMAIL_PASSWORD);

  try {
    let data = await req.json();

    const adminMailOptions = {
      from: data.email,
      to: process.env.EMAIL_USER,
      subject: `Miggy's Munchies Contact Entry ${data.name}`,
      text: `Name: ${data.name}\n
            Phone Number: ${data.phoneNumber}\n
            Email Address: ${data.email}\n
            Message: ${data.message}`,
    };

    const customerMailOptions = {
      from: process.env.EMAIL_USER,
      to: data.email,
      subject: `Miggy's Munchies Contact Entry Received`,
      text: `Name: ${data.name}\n
            Phone Number: ${data.phoneNumber}\n
            Email Address: ${data.email}\n
            Message: ${data.message}\n
            Thank you for the message, we will reply shortly`,
    };

    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(customerMailOptions);
    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error sending email" },
      { status: 500 }
    );
  }
}
