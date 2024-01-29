import { NextResponse } from "next/server";
import { connectToDB } from "@/app/utils/DB-connect";
import Menu from "@/app/models/Menu";


export async function GET(req) {
  try {
    await connectToDB();
    const products = await Menu.find();
    // Return the response
    return new NextResponse(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new NextResponse(
      "An error occurred while retrieving data from DB." + error,
      { status: 500 }
    );
  }
}