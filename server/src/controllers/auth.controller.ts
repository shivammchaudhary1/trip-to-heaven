import { Request, Response } from "express";
import User from "../models/user.model.js";
import { hasPassword, comparePassword } from "../config/lib/bcrypt.js";
import { generateToken } from "../config/lib/jwt.js";

const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists, login instead",
        success: false,
      });
    }

    const hashedPassword = await hasPassword({ password });
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: ["user"],
    });
    await newUser.save();

    const token = generateToken({
      userId: newUser._id.toString(),
      role: newUser.role,
    });

    return res.status(201).json({
      message: "User registered successfully",
      success: true,
      token,
      user: newUser,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Use .select("+password") to include the password field (it has select: false in model)
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found, register instead", success: false });
    }

    const isPasswordValid = await comparePassword({
      password,
      hashedPassword: user.password,
    });

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Invalid password, try again", success: false });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    const token = generateToken({
      userId: user._id.toString(),
      role: user.role,
    });

    return res
      .status(200)
      .json({ message: "Login successful", success: true, token, user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export { registerUser, loginUser };
