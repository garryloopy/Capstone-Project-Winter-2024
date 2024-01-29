import { NextResponse } from "next/server";
import { connectToDB } from "@/app/utils/DB-connect";
import Menu from "@/app/models/Menu";

export async function PUT(req) {
  try {
    const { _id, title, description, price, image, sizes, extra} = await req.json();

    await connectToDB();

    const menuUpdate = await Menu.updateOne(
      { _id },
      {
        title: title,
        description: description,
        price: price,
        image: image,
        sizes: sizes,
        extra: extra,
      }
    );
    return NextResponse.json(
      // { message: "The information is updated" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while updating." },
      { status: 500 }
    );
  }
}
