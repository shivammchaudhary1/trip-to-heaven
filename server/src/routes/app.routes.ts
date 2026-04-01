import { Application } from "express";
import authRouter from "./auth.routes.js";
import propertyRouter from "./property.routes.js";
import flightRouter from "./flight.routes.js";
import busRouter from "./bus.routes.js";
import busBookingRouter from "./busBooking.routes.js";
import userRouter from "./user.routes.js";

const appRoutes = (app: Application): void => {
  app.use("/api/auth", authRouter);
  app.use("/api/property", propertyRouter);
  app.use("/api/flight", flightRouter);
  app.use("/api/bus", busRouter);
  app.use("/api/bus-booking", busBookingRouter);
  app.use("/api/user", userRouter);
};

export default appRoutes;
