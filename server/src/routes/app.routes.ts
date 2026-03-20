import { Application } from "express";
import authRouter from "./auth.routes.js";
import propertyRouter from "./property.routes.js";

const appRoutes = (app: Application): void => {
  app.use("/api/auth", authRouter);
  app.use("/api/property", propertyRouter);
};

export default appRoutes;
