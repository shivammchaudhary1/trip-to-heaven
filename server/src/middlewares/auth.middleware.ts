import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../config/lib/jwt.js";
import "../interface/lib.types.js";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        code: "NO_TOKEN",
        message: "Unauthorized: No token provided",
        success: false,
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({
        code: "TOKEN_EXPIRED",
        message: "Token expired, please login again",
        success: false,
      });
    }

    req.userId = String(decoded.userId);
    req.role = String(decoded.role);
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(401).json({
      code: "TOKEN_EXPIRED",
      message: "Token expired, please login again",
      success: false,
    });
  }
};

export const roleMiddleware = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.role || !allowedRoles.includes(req.role)) {
      return res.status(403).json({
        code: "FORBIDDEN",
        message: "Forbidden: You do not have access to this resource",
        success: false,
      });
    }
    next();
  };
};
