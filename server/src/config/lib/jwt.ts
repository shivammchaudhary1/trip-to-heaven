import jwt, { type JwtPayload, type SignOptions } from "jsonwebtoken";
import envs from "../environment/envs.js";
import type { IJwtPayload, IJwtDecoded } from "../../interface/lib.types.js";

export const generateToken = (payload: IJwtPayload): string => {
  try {
    return jwt.sign(payload as JwtPayload, envs.jwtSecret, {
      expiresIn: envs.jwtExpiresIn,
    } as SignOptions);
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Token generation failed");
  }
};

export const verifyToken = (token: string): IJwtDecoded | null => {
  try {
    return jwt.verify(token, envs.jwtSecret) as IJwtDecoded;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
};
