import { model, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      unique: true,
      required: true,
      type: String,
    },
    username: {
      unique: true,
      required: true,
      type: String,
    },
    password: {
      required: true,
      type: String,
      select: false,
    },
    isAdmin: {
      required: true,
      type: Boolean,
      default: false,
    },
    isActive: {
      required: true,
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.index({ email: "text", username: "text" });

export const UserModel = model("User", UserSchema);
