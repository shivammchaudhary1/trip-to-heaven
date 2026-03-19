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
    mobileNumber: {
      type: Number,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    dateOfBirth: {
      type: Date,
    },
    isMarried: {
      type: Boolean,
      default: false,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    profilePicture: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const User = mongoose.model<IUserExt>("User", userSchema);
export default User;
