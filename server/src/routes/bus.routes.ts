import express from "express";
import {
  addBus,
  getAllBuses,
  getBusById,
  updateBus,
  removeBus,
} from "../controllers/bus.controller.js";
import {
  authMiddleware,
  roleMiddleware,
} from "../middlewares/auth.middleware.js";

const busRouter = express.Router();

// Public routes
busRouter.get("/getAll", getAllBuses);
busRouter.get("/getById/:busId", getBusById);

// Protected routes (requires authentication + admin role)
busRouter.post(
  "/add",
  authMiddleware,
  roleMiddleware(["admin", "superadmin"]),
  addBus,
);
busRouter.put(
  "/update/:busId",
  authMiddleware,
  roleMiddleware(["admin", "superadmin"]),
  updateBus,
);
busRouter.delete(
  "/remove/:busId",
  authMiddleware,
  roleMiddleware(["admin", "superadmin"]),
  removeBus,
);

export default busRouter;
