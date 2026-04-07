import express from "express";
const busBookingRouter = express.Router();
import { createBusBooking } from "../controllers/busBooking.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

busBookingRouter.post("/book", authMiddleware, createBusBooking);

export default busBookingRouter;
