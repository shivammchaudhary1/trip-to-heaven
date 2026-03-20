import express from "express";
import {
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
  getAllUsers,
  getUserById,
} from "../controllers/user.controller.js";

const userRouter = express.Router();

// Protected routes (requires authentication)
userRouter.get("/getProfile", getUserProfile);
userRouter.patch("/update", updateUserProfile);
userRouter.delete("/remove", deleteUserProfile);
userRouter.get("/:userId", getUserById);
// Admin routes (requires authentication and admin/superadmin role)
userRouter.get("/getAll", getAllUsers);

export default userRouter;
