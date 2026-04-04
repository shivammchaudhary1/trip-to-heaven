import { startServer } from "./config/app/express.js";

startServer().catch((error) => {
  console.error("Server startup failed:", error);
  process.exit(1);
});
