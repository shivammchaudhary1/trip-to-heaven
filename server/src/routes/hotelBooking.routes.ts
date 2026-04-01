import express from "express";
const hotelBookingRouter = express.Router();
import { createHotelBooking } from "../controllers/hotelBooking.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

// Protected route for creating a hotel booking (requires authentication)
hotelBookingRouter.post("/create", authMiddleware, createHotelBooking);

export default hotelBookingRouter;
