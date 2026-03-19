import mongoose from "mongoose";
import { IUserExt } from "../interface/user.types.js";

const userSchema = new mongoose.Schema<IUserExt>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const User = mongoose.model<IUserExt>("User", userSchema);
export default User;
