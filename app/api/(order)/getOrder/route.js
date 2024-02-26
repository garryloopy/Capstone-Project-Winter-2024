import { NextResponse } from "next/server";
import { connectToDB } from "@/app/utils/DB-connect";
import Order from "@/app/models/Order";

export async function GET(req) {
 const url = new URL (req.url);
 const paymentId = url.searchParams.get('id');

 try {
    await connectToDB();
    const order = await Order.find({paymentId});
    // Return the response
    return new NextResponse(JSON.stringify(order), { status: 200 });
  } catch (error) {
    return new NextResponse(
      "An error occurred while retrieving data from DB." + error,
      { status: 500 }
    );
  }
}
