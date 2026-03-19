export interface IEnvironmentConfig {
  PORT: number;
  MONGO_URI: string;
  NODE_ENV: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  COOKIE_SECRET: string;
  COOKIE_EXPIRES_IN: string;
  CLIENT_URL: string;
}
