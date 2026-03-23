export const envs = {
  development: {
    API_URL: import.meta.env.VITE_API_URL || "http://localhost:8080",
  },
  production: {
    API_URL: "https://trip-to-heaven.onrender.com",
  },
  stage: {
    API_URL: "https://trip-to-heaven.onrender.com",
  },
};
