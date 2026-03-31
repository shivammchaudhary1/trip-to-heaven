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
userRouter.get("/getProfile",roleMiddleware(["user","admin", "superadmin"]), getUserProfile);
userRouter.patch("/update",roleMiddleware(["user","admin", "superadmin"]), updateUserProfile);
userRouter.delete("/remove",roleMiddleware(["user","admin", "superadmin"]), deleteUserProfile);
// Admin routes (requires authentication and admin/superadmin role)
userRouter.get("/getAll",roleMiddleware(["admin", "superadmin"]), getAllUsers);
userRouter.get("/:userId",roleMiddleware(["admin", "superadmin"]), getUserById);


export default userRouter;
