import express from "express";
const flightBookingRouter = express.Router();
import { createFlightBooking } from "../controllers/flightBooking.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

flightBookingRouter.post("/book", authMiddleware, createFlightBooking);

export default flightBookingRouter;
