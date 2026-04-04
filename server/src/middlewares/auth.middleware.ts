import { NextFunction, Request, Response } from "express";
import { verifyAccessToken, verifyRefreshToken } from "../config/lib/jwt.js";
import "../interface/lib.types.js";

// export const authMiddleware = (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({
//         message: "Unauthorized: No token provided",
//         success: false,
//       });
//     }

//     const token = authHeader.split(" ")[1];

//     const decoded = verifyAccessToken(token);

//     if (!decoded) {
//       return res.status(401).json({
//         message: "Token expired, please login again",
//         success: false,
//       });
//     }

//     req.userId = String(decoded.userId);
//     // Ensure role is always an array
//     req.userRole = Array.isArray(decoded.role)
//       ? decoded.role
//       : [String(decoded.role)];
//     next();
//   } catch (error) {
//     console.error("Auth middleware error:", error);
//     return res.status(401).json({
//       message: "Token expired, please login again",
//       success: false,
//     });
//   }
// };

// /**
//  * Generic role-based middleware factory
//  * Usage: roleMiddleware("admin", "superadmin") or roleMiddleware("owner")
//  * Now supports multiple roles per user
//  */
// export const roleMiddleware = (...allowedRoles: string[]) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const userRoles = req.userRole;

//       if (!userRoles || !Array.isArray(userRoles) || userRoles.length === 0) {
//         return res.status(401).json({
//           code: "ROLE_NOT_FOUND",
//           message: "User roles not found. Please authenticate first.",
//           success: false,
//         });
//       }

//       // Check if user has any of the allowed roles
//       const hasRequiredRole = userRoles.some((role) =>
//         allowedRoles.includes(role),
//       );

//       if (!hasRequiredRole) {
//         return res.status(403).json({
//           code: "FORBIDDEN",
//           message: `Access denied. Required role(s): ${allowedRoles.join(" or ")}. Your roles: ${userRoles.join(", ")}`,
//           success: false,
//         });
//       }

//       next();
//     } catch (error) {
//       console.error("Role middleware error:", error);
//       return res.status(500).json({
//         code: "INTERNAL_ERROR",
//         message: "Internal server error",
//         success: false,
//       });
//     }
//   };
// };
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    // 1. No token
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Unauthorized: No token provided",
        success: false,
      });
    }

    const token = authHeader.split(" ")[1];

    // console.log("authtoken", token);

    // 2. Verify access token
    const decoded = verifyAccessToken(token);

    // console.log("decoded", decoded);

    // 3. If invalid or expired
    if (!decoded) {
      return res.status(403).json({
        message: "Access token expired or invalid",
        success: false,
      });
    }

    // 4. Attach user data
    req.userId = String(decoded.userId);
    req.userRole = Array.isArray(decoded.role)
      ? decoded.role
      : [String(decoded.role)];

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(403).json({
      message: "Invalid token",
      success: false,
    });
  }
};

export const roleMiddleware = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const userRoles = req.userRole;

      console.log("userRoles in roleMiddleware", userRoles);

      if (!userRoles || !Array.isArray(userRoles) || userRoles.length === 0) {
        return res.status(401).json({
          message: "User roles not found. Please authenticate first.",
          success: false,
        });
      }

      const hasRequiredRole = userRoles.some((role) =>
        allowedRoles.includes(role),
      );

      if (!hasRequiredRole) {
        return res.status(403).json({
          message: `Access denied. Required role(s): ${allowedRoles.join(" or ")}. Your roles: ${userRoles.join(", ")}`,
          success: false,
        });
      }

      next();
    } catch (error) {
      console.error("Role middleware error:", error);
      return res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  };
};
