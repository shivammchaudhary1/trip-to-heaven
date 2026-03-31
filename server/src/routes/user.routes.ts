import express from "express";
import {
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
  getAllUsers,
  getUserById,
} from "../controllers/user.controller.js";
import { roleMiddleware } from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

// Protected routes (requires authentication)
userRouter.get("/getProfile",roleMiddleware(["user"]), getUserProfile);
userRouter.patch("/update",roleMiddleware(["user"]), updateUserProfile);
userRouter.delete("/remove",roleMiddleware(["user"]), deleteUserProfile);
// Admin routes (requires authentication and admin/superadmin role)
userRouter.get("/getAll", getAllUsers);
userRouter.get("/:userId",roleMiddleware(["admin", "superadmin"]), getUserById);


export default userRouter;
