import express from "express";
import {
  addProperty,
  removeProperty,
  updateProperty,
  getAllProperties,
  getPropertyById,
} from "../controllers/property.controller.js";

const propertyRouter = express.Router();

// Public routes
propertyRouter.get("/getAll", getAllProperties);
propertyRouter.get("/:propertyId", getPropertyById);
// Protected routes (requires authentication)
propertyRouter.post("/add", addProperty); // Admin & super admin only
propertyRouter.post("/remove/:propertyId", removeProperty); // Admin & super admin only
propertyRouter.put("/update/:propertyId", updateProperty);

export default propertyRouter;
