// Global type declarations for Express Request and other interfaces
declare global {
  namespace Express {
    interface Request {
      userId?: string;
      role?: string;
    }
  }
}

export interface IBcryptRequest {
  password: string;
}

export interface IBryptCompareRequest {
  password: string;
  hashedPassword: string;
}

export interface IJwtPayload extends Record<string, unknown> {}

export interface IJwtDecoded extends IJwtPayload {
  iat?: number;
  exp?: number;
  userId?: string;
}
