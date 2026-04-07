import { Application } from "express";
import authRouter from "./auth.routes.js";

import propertyRouter from "./property.routes.js";
import busRouter from "./bus.routes.js";
import flightRouter from "./flight.routes.js";

import userRouter from "./user.routes.js";

import busBookingRouter from "./busBooking.routes.js";
import hotelBookingRouter from "./hotelBooking.routes.js";
import flightBookingRouter from "./flightBooking.routes.js";

const appRoutes = (app: Application): void => {
  app.use("/api/auth", authRouter);
  app.use("/api/property", propertyRouter);
  app.use("/api/flight", flightRouter);
  app.use("/api/bus", busRouter);
  app.use("/api/user", userRouter);

  // booking
  app.use("/api/bus-booking", busBookingRouter);
  app.use("/api/hotel-booking", hotelBookingRouter);
  app.use("/api/flight-booking", flightBookingRouter);
};

export default appRoutes;
