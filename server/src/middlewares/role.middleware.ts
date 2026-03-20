import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../config/lib/jwt.js";
import "../interface/lib.types.js";

/**
 * Middleware to extract user role from JWT token
 * Must be used before roleMiddleware
 */
export const extractUserRole = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        code: "NO_TOKEN",
        message: "Unauthorized: No token provided",
        success: false,
      });
    }

    const decodedToken = verifyToken(token);

    if (!decodedToken) {
      return res.status(401).json({
        code: "TOKEN_EXPIRED",
        message: "Token expired, please login again",
        success: false,
      });
    }

    req.userId = String(decodedToken?.userId);
    // Ensure role is always an array
    req.userRole = Array.isArray(decodedToken?.role)
      ? decodedToken.role
      : [String(decodedToken?.role || "user")];
    next();
  } catch (error) {
    console.error("Role extraction error:", error);
    return res.status(401).json({
      code: "TOKEN_INVALID",
      message: "Invalid token",
      success: false,
    });
  }
};

/**
 * Generic role-based middleware factory
 * Usage: roleMiddleware("admin", "superadmin") or roleMiddleware("owner")
 * Must be used after extractUserRole middleware
 * Supports multiple roles per user
 *
 * Example:
 * app.delete("/user/:id", extractUserRole, roleMiddleware("admin", "superadmin"), deleteUser);
 */
export const roleMiddleware = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const userRoles = req.userRole;

      if (!userRoles || !Array.isArray(userRoles) || userRoles.length === 0) {
        return res.status(401).json({
          code: "ROLE_NOT_FOUND",
          message: "User roles not found. Please authenticate first.",
          success: false,
        });
      }

      // Check if user has any of the allowed roles
      const hasRequiredRole = userRoles.some((role) =>
        allowedRoles.includes(role),
      );

      if (!hasRequiredRole) {
        return res.status(403).json({
          code: "FORBIDDEN",
          message: `Access denied. Required role(s): ${allowedRoles.join(" or ")}. Your roles: ${userRoles.join(", ")}`,
          success: false,
        });
      }

      next();
    } catch (error) {
      console.error("Role middleware error:", error);
      return res.status(500).json({
        code: "INTERNAL_ERROR",
        message: "Internal server error",
        success: false,
      });
    }
  };
};
