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
      subject: `Miggy's Munchies Contact Entry from ${data.name}`,
      html: `
      <section style="max-width: 32rem; margin: 0 auto; padding: 1rem; font-family: Arial, sans-serif; border: 1px solid #ccc; border-radius: 8px;">
        <div style="text-align: center; padding-bottom: 1rem;">
          <h2 style="color: #374151; font-size: 1.5rem; font-weight: 600; margin-bottom: 0.5rem;">
            A contact entry was received
          </h2>
          <p style="color: #6B7280; font-size: 1rem; margin: 0;">
            Below regards the information for this entry.
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

    const customerMailOptions = {
      from: process.env.EMAIL_USER,
      to: data.email,
      subject: `Miggy's Munchies Contact Entry Received`,
      html: `
      <section style="max-width: 32rem; margin: 0 auto; padding: 1rem; font-family: Arial, sans-serif; border: 1px solid #ccc; border-radius: 8px;">
        <div style="text-align: center; padding-bottom: 1rem;">
          <h2 style="color: #374151; font-size: 1.5rem; font-weight: 600; margin-bottom: 0.5rem;">
            Thank you for reaching out to us at Miggy's Munchies!
          </h2>
          <p style="color: #6B7280; font-size: 1rem; margin: 0;">
            We have received your message and will reply to you shortly.
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

    transporter.sendMail(adminMailOptions);
    transporter.sendMail(customerMailOptions);
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
