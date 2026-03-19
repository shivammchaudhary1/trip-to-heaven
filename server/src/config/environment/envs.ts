import dotenv from "dotenv";
import type { IEnvironmentConfig } from "../../interface/environment.types.js";

const currentNodeEnv = process.env.NODE_ENV ?? "development";
const envFilePath =
  currentNodeEnv === "production" ? ".env.prod" : ".env.stage";

dotenv.config({ path: envFilePath });

const envs: IEnvironmentConfig = {
  port: Number.parseInt(process.env.PORT ?? "8080", 10),
  mongoUri:
    process.env.MONGODB_URI || "mongodb://localhost:27017/trip-to-heaven",
  jwtSecret: process.env.JWT_SECRET || "your_jwt_secret",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "30d",
  nodeEnv: currentNodeEnv,
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  cookieSecret: process.env.COOKIE_SECRET || "your_cookie_secret",
  cookieExpiresIn: process.env.COOKIE_EXPIRES_IN || "3d",
  saltRounds: Number.parseInt(process.env.SALT_ROUNDS ?? "1", 1),
};

export default envs;
