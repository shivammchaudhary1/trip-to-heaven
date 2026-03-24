import { Request, Response } from "express";
import User from "../models/user.model.js";
import { hasPassword, comparePassword } from "../config/lib/bcrypt.js";
import {
  generateToken,
  verifyRefreshToken,
  generateAccessToken,
} from "../config/lib/jwt.js";

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

    newUser.refreshToken = token.refreshToken;
    await newUser.save();

    const userWithoutSensitiveData = await User.findById(newUser._id).select(
      "-refreshToken -password",
    );

    return res.status(201).json({
      message: "User registered successfully",
      success: true,
      accessToken: token.accessToken,
      user: userWithoutSensitiveData,
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

    user.refreshToken = token.refreshToken;
    await user.save();

    const userWithoutSensitiveData = await User.findById(user._id).select(
      "-refreshToken -password",
    );

    return res.status(200).json({
      message: "Login successful",
      success: true,
      accessToken: token.accessToken,
      user: userWithoutSensitiveData,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

const refreshToken = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId).select("+refreshToken");

    if (!user || !user.refreshToken) {
      return res.status(400).json({
        message: "User not found or refresh token missing",
        success: false,
      });
    }

    const isRefreshTokenValid = verifyRefreshToken(user.refreshToken);

    if (!isRefreshTokenValid) {
      return res.status(403).json({
        message: "Invalid refresh token, or Expired. Please login again.",
        success: false,
      });
    }

    const accessToken = generateAccessToken({
      userId: user._id.toString(),
      role: user.role,
    });

    res.status(200).json({
      message: "Access token refreshed successfully",
      success: true,
      accessToken,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export { registerUser, loginUser, refreshToken };
