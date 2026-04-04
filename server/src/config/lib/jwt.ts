import jwt, { type JwtPayload, type SignOptions } from "jsonwebtoken";
import envs from "../environment/envs.js";
import type { IJwtPayload, IJwtDecoded } from "../../interface/lib.types.js";

export const generateAccessToken = (payload: IJwtPayload): string => {
  try {
    return jwt.sign(payload as JwtPayload, envs.jwtAccessSecret, {
      expiresIn: envs.jwtAccessExpiresIn,
    } as SignOptions);
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Token generation failed");
  }
};

export const generateRefreshToken = (payload: IJwtPayload): string => {
  try {
    return jwt.sign(payload as JwtPayload, envs.jwtRefreshSecret, {
      expiresIn: envs.jwtRefreshExpiresIn,
    } as SignOptions);
  } catch (error) {
    console.error("Error generating refresh token:", error);
    throw new Error("Refresh token generation failed");
  }
};

export const verifyAccessToken = (token: string): IJwtDecoded | null => {
  try {
    return jwt.verify(token, envs.jwtAccessSecret) as IJwtDecoded;
  } catch (error) {
    console.error("Error verifying access token:", error);
    return null;
  }
};

export const verifyRefreshToken = (token: string): IJwtDecoded | null => {
  try {
    return jwt.verify(token, envs.jwtRefreshSecret) as IJwtDecoded;
  } catch (error) {
    console.error("Error verifying refresh token:", error);
    return null;
  }
};

export const generateToken = (payload: IJwtPayload) => {
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);
  return { accessToken, refreshToken };
};

// console.log(generateToken({ name: "shivam", role: ["admin"] }));

// {
//   accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2hpdmFtIiwicm9sZSI6WyJhZG1pbiJdLCJpYXQiOjE3NzQzNjExMTUsImV4cCI6MTc3NDM2MjAxNX0.e_RsiykznDycymzRqbd73TJykGW65fc9BCzCCEjfyLI',
//   refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2hpdmFtIiwicm9sZSI6WyJhZG1pbiJdLCJpYXQiOjE3NzQzNjExMTUsImV4cCI6MTc3NDk2NTkxNX0.VdfKm-PNum4No9Gpddl87uHl9BDRdftnpEPXLgw-P_8'
// }
