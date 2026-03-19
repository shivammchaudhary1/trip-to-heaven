import dotenv from "dotenv";
dotenv.config();
import { IEnvironmentConfig } from "../interface/environment.types";

export default {
  PORT: process.env.PORT || 8080,
  MONGO_URI:
    process.env.MONGO_URI || "mongodb://localhost:27017/trip-to-heaven",
  JWT_SECRET: process.env.JWT_SECRET || "your_jwt_secret",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "30d",

  NODE_ENV: process.env.NODE_ENV || "development",
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",
  COOKIE_SECRET: process.env.COOKIE_SECRET || "your_cookie_secret",
  COOKIE_EXPIRES_IN: process.env.COOKIE_EXPIRES_IN || "3d",
} as IEnvironmentConfig;
