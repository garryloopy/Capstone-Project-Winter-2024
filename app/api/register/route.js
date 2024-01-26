import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDB } from "@/app/utils/DB-connect";
import User from "@/app/model/User";
import Joi from "joi";
import adminIds from "../../../app/adminIds";

const schema = Joi.object({
  name: Joi.string()
    .regex(/^[a-zA-Z\s]{3,30}$/)
    .required(),

  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9!@#$%^&*()_+]{8,}$"))
    .required(),
  employeeId: Joi.string()
    .pattern(new RegExp(/^[a-zA-Z0-9-]{1,7}$/))
    .required(),
});

export async function POST(req) {
  try {
    const { name, email, password, employeeId } = await req.json();

    // validate the input
    const { error } = schema.validate({ name, password, employeeId });
    if (error) {
      return NextResponse.json(
        { message: "The user name or password or employee ID is invalid" },
        { status: 400 }
      );
    }

    let isValidEmployeeId = false;
    for (let i = 0; i < adminIds.length; i++) {
      if (employeeId === adminIds[i].employeeId) {
        isValidEmployeeId = true;
        break;
      }
    }
    if (!isValidEmployeeId) {
      return NextResponse.json(
        { message: "The employee ID is invalid" },
        { status: 400 }
      );
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await connectToDB();
    const user = await User.findOne({ email }).select("_id");
    if (user) {
      return NextResponse.json({ message: "User already exists" });
    } else {
      const newUser = new User({
        name,
        email,
        password: hashPassword,
        employeeId,
      });
      await newUser.save();
      return NextResponse.json(
        { message: "User registered successfully" },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering." },
      { status: 500 }
    );
  }
}
