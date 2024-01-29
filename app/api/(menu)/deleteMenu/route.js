import { NextResponse } from "next/server";
import { connectToDB } from "@/app/utils/DB-connect";
import Menu from "@/app/models/Menu";

export async function DELETE(req) {
  try {
    const { _id } = await req.json();

    await connectToDB();

    const MenuDeleted = await Menu.deleteOne({ _id });
    return NextResponse.json(
      { message: "The Menu is deleted" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while deleting." },
      { status: 500 }
    );
  }
}
