import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema(
  {
   paymentId:{
    type: String,
   },

    clientInfo:Object,
    cartProducts: Object,
    paid: {
      type: String,
    },
  },
  { timestamps: true }
);
const Order = models.Order || model("Order", OrderSchema);

export default Order;
