import type { ServiceAccount } from "firebase-admin";

export interface IEnvironmentConfig {
  port: number;
  mongoUri: string;
  jwtSecret: string;
  jwtExpiresIn: string;
  nodeEnv: string;
  clientUrl: string;
  cookieSecret: string;
  cookieExpiresIn: string;
  saltRounds: number;
  firebaseProjectId: string;
  firebaseServiceAccount: ServiceAccount;
}
