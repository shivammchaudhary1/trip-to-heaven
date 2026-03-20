import User from "../models/user.model.js";
import { Request, Response } from "express";

// Get current user's profile
const getUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(userId).select("-password -preferences");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User profile retrieved successfully",
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Error retrieving user profile",
    });
  }
};

// Update current user's profile
const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const {
      name,
      mobileNumber,
      profilePicture,
      bio,
      preferences,
      dateOfBirth,
      isMarried,
      gender,
    } = req.body;

    // Validate allowed fields to update
    const allowedUpdates = {
      name,
      mobileNumber,
      profilePicture,
      bio,
      preferences,
      dateOfBirth,
      isMarried,
      gender,
    };

    // Remove undefined fields
    Object.keys(allowedUpdates).forEach(
      (key) =>
        allowedUpdates[key as keyof typeof allowedUpdates] === undefined &&
        delete allowedUpdates[key as keyof typeof allowedUpdates],
    );

    const updatedUser = await User.findByIdAndUpdate(userId, allowedUpdates, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User profile updated successfully",
      data: updatedUser,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Error updating user profile",
    });
  }
};

// Delete user's profile
const deleteUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update isActive field to false
    user.isActive = false;
    await user.save();

    res.status(200).json({
      success: true,
      message: "User profile deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Error deleting user profile",
    });
  }
};

// Get all users (admin only)
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, isActive } = req.query;

    const query: any = {};
    if (isActive !== undefined) {
      query.isActive = isActive === "true";
    }

    const skip = ((Number(page) - 1) * Number(limit)) as number;

    const users = await User.find(query)
      .select("-password")
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(query);

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: users,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Error retrieving users",
    });
  }
};

// Get user by ID
const getUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Error retrieving user",
    });
  }
};

export {
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
  getAllUsers,
  getUserById,
};
