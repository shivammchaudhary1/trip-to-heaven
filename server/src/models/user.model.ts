import mongoose from "mongoose";
import { IUserExt } from "../interface/user.types.js";

const userSchema = new mongoose.Schema<IUserExt>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
      index: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    mobileNumber: {
      type: String,
      match: [/^[+1-9]\d{1,14}$/, "Please enter a valid phone number"],
      sparse: true,
      index: true,
    },
    role: {
      type: [String],
      enum: {
        values: ["superadmin", "admin", "owner", "user"],
        message: "Role must be one of: superadmin, admin, owner, or user",
      },
      default: ["user"],
      validate: {
        validator: function (roles: string[]) {
          return Array.isArray(roles) && roles.length > 0;
        },
        message: "User must have at least one role",
      },
    },
    dateOfBirth: {
      type: Date,
      validate: {
        validator: function (value) {
          return !value || value < new Date();
        },
        message: "Invalid date of birth",
      },
    },
    isMarried: {
      type: Boolean,
      default: false,
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "other"],
        message: "Gender must be male, female, or other",
      },
      default: "male",
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    profilePicture: {
      type: String,
      trim: true,
    },
    bio: {
      type: String,
      maxlength: [500, "Bio cannot exceed 500 characters"],
      trim: true,
    },
    lastLogin: {
      type: Date,
    },
    preferences: {
      newsletter: {
        type: Boolean,
        default: true,
      },
      notifications: {
        type: Boolean,
        default: true,
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Indexes for better query performance
userSchema.index({ email: 1, isActive: 1 });
userSchema.index({ createdAt: -1 });

const User = mongoose.model<IUserExt>("User", userSchema);
export default User;
