import { NextResponse } from "next/server";
import { connectToDB } from "@/app/utils/DB-connect";
import Order from "@/app/models/Order"; // Import the Order model

export async function PUT(req) {
  try {
    const { _id, orderStatus } = await req.json(); // Only accept _id and orderStatus

    await connectToDB();

    const updatedOrder = await Order.findByIdAndUpdate(
      _id,
      { orderStatus: orderStatus },
      { new: true } // Return the updated document
    );

    if (!updatedOrder) {
      return NextResponse.json(
        { message: "Order not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Order updated successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("An error occurred while updating order:", error);
    return NextResponse.json(
      { message: "An error occurred while updating order." },
      { status: 500 }
    );
  }
}
