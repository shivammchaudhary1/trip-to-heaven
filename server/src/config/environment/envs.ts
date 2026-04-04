import dotenv from "dotenv";
import type { IEnvironmentConfig } from "../../interface/environment.types.js";

const currentNodeEnv = process.env.NODE_ENV ?? "development";
const envFilePath =
  currentNodeEnv === "production" ? ".env.prod" : ".env.stage";

dotenv.config({ path: envFilePath });

const firebaseServiceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
  : null;

if (!firebaseServiceAccountJson) {
  throw new Error("FIREBASE_SERVICE_ACCOUNT environment variable is not set");
}

const envs: IEnvironmentConfig = {
  port: Number.parseInt(process.env.PORT ?? "8080", 10),
  mongoUri:
    process.env.MONGODB_URI || "mongodb://localhost:27017/trip-to-heaven",

  jwtAccessSecret: process.env.JWT_ACCESS_SECRET || "your_jwt_secret",
  jwtAccessExpiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN || "15m",
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || "your_jwt_refresh_secret",
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || "7d",

  nodeEnv: currentNodeEnv,
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  cookieSecret: process.env.COOKIE_SECRET || "your_cookie_secret",
  cookieExpiresIn: process.env.COOKIE_EXPIRES_IN || "3d",
  saltRounds: Number.parseInt(process.env.SALT_ROUNDS ?? "1", 1),
  firebaseProjectId: process.env.FIREBASE_PROJECT_ID || "trip-to-heaven-766c8",
  firebaseServiceAccount: firebaseServiceAccountJson,
};

export default envs;
