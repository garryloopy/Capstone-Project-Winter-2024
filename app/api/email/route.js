// // emailServer.js
// const express = require("express");
// const nodemailer = require("nodemailer");

// const app = express();
// app.use(express.json());

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASSWORD,
//   },
// });

// app.post("/send-email", (req, res) => {
//   const emailDetails = req.body;

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: process.env.EMAIL_USER,
//     subject: `Miggy's Munchies Contact Entry ${emailDetails.name}`,
//     text: `Name: ${emailDetails.name}\n
//            Phone Number: ${emailDetails.phoneNumber}\n
//            Email Address: ${emailDetails.email}\n
//            Message: ${emailDetails.message}`,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error("Error sending email:", error);
//       res.status(500).send("Error sending email");
//     } else {
//       console.log("Email sent:", info.response);
//       res.status(200).send("Email sent successfully");
//     }
//   });
// });

// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


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

    // console.log(data);

    const mailOptions = {
      from: data.email,
      to: process.env.EMAIL_USER,
      subject: `Miggy's Munchies Contact Entry ${data.name}`,
      text: `Name: ${data.name}\n
            Phone Number: ${data.phoneNumber}\n
            Email Address: ${data.email}\n
            Message: ${data.message}`,
            // html: `<h1>Hi, ${data.name}</h1>
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });

    } catch (error) {
          return NextResponse.json({ message: "Error sending email" }, { status: 500 });
    }
}