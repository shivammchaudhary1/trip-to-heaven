import dotenv from "dotenv";
dotenv.config();
import type { IEnvironmentConfig } from "../../interface/environment.types.js";

const envs: IEnvironmentConfig = {
  port: Number.parseInt(process.env.PORT ?? "8080", 10),
  mongoUri:
    process.env.MONGODB_URI || "mongodb://localhost:27017/trip-to-heaven",
  jwtSecret: process.env.JWT_SECRET || "your_jwt_secret",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "30d",
  nodeEnv: process.env.NODE_ENV || "development",
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  cookieSecret: process.env.COOKIE_SECRET || "your_cookie_secret",
  cookieExpiresIn: process.env.COOKIE_EXPIRES_IN || "3d",
};

export default envs;
