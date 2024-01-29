import { mongoose, Schema, model, models } from "mongoose";

const ExtraPartSchema = new Schema({
  name : String,
  price : Number,
})

const MenuSchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: String,
    },

    image: {
      type: String,
    },
    public_id: {
      type: String
    },

    sizes: {
      type: [ExtraPartSchema],
    },

    extra: {
      type: [ExtraPartSchema],
    },
  },
  { timestamps: true }
);
const Menu = models.Menu || model("Menu", MenuSchema);

export default Menu;
