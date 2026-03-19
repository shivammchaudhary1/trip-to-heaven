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
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const token = generateToken({ userId: newUser._id.toString() });

    return res
      .status(201)
      .json({ message: "User registered successfully", success: true, token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

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

    const token = generateToken({ userId: user._id.toString() });

    return res
      .status(200)
      .json({ message: "Login successful", success: true, token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export { registerUser, loginUser };
