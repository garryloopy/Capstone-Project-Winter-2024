import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },

    employeeId: {
      type: String,
    },
  },
  { timestamps: true }
);
const User = models.User || model("User", UserSchema);

export default User;
