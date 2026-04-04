import express from "express";
import {
  addProperty,
  removeProperty,
  updateProperty,
  getAllProperties,
  getPropertyById,
} from "../controllers/property.controller.js";
import {
  authMiddleware,
  roleMiddleware,
} from "../middlewares/auth.middleware.js";

const propertyRouter = express.Router();

// Public routes
propertyRouter.get("/getAll", getAllProperties);
propertyRouter.get("/:propertyId", getPropertyById);
// Protected routes (requires authentication)
propertyRouter.post("/add", authMiddleware, roleMiddleware(["admin", "superadmin"]), addProperty);
propertyRouter.post("/remove/:propertyId", authMiddleware, roleMiddleware(["admin", "superadmin"]), removeProperty);
propertyRouter.put("/update/:propertyId", authMiddleware, roleMiddleware(["admin", "superadmin"]), updateProperty);

export default propertyRouter;
