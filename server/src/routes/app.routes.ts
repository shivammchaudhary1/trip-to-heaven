import { Application } from "express";
import authRouter from "./auth.routes.js";

const appRoutes = (app: Application): void => {
  app.use("/api/auth", authRouter);
};

export default appRoutes;
