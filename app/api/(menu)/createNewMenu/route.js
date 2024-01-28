import { NextResponse } from "next/server";
import { connectToDB } from "@/app/utils/DB-connect";
import Menu from "@/app/models/Menu";

export async function POST(req) {
  try {
    let data = await req.json();

     const basicPrice = parseFloat(data.price);
     const formattedPrice = `$${basicPrice.toFixed(2)}`;

     data = { ...data, price: formattedPrice };

    await connectToDB();
    const newItem = await Menu.create(data);

    return NextResponse.json(
      { message: "New meal is created" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while load data." },
      { status: 500 }
    );
  }
}
