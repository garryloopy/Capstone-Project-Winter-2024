import { Schema, model, models } from "mongoose";

//GARRY, ADD orderStatus to the Order model
const OrderSchema = new Schema(
  {
    orderId: {
      type: String,
    },

    paymentId: {
      type: String,
    },

    paid: {
      type: String,
    },

    cardBrand: {
      type: String,
    },

    lastFourDigits: {
      type: String,
    },
    orderStatus: {
      type: String,
    },

    clientInfo: Object,

    cartProducts: Object,
  },
  { timestamps: true }
);
const Order = models.Order || model("Order", OrderSchema);

export default Order;
