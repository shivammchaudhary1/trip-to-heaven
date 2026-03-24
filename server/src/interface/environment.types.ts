import type { ServiceAccount } from "firebase-admin";

export interface IEnvironmentConfig {
  port: number;
  mongoUri: string;
  jwtAccessSecret: string;
  jwtAccessExpiresIn: string;
  jwtRefreshSecret: string;
  jwtRefreshExpiresIn: string;
  nodeEnv: string;
  clientUrl: string;
  cookieSecret: string;
  cookieExpiresIn: string;
  saltRounds: number;
  firebaseProjectId: string;
  firebaseServiceAccount: ServiceAccount;
}
