import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import envs from "../environment/envs.js";
import { connectDB } from "../db/db.js";
import chalk from "chalk";
import appRoutes from "../../routes/app.routes.js";

export const startServer = async (): Promise<void> => {
  const app = express();

  //middleware

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(morgan("dev"));

  app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
      message: "Welcome to Trip To Heaven API",
      time: new Date().toISOString(),
    });
  });

  //routes
  appRoutes(app);

  app.listen(envs.port, async () => {
    try {
      await connectDB();
      const startupLogs = [
        chalk.gray(""),
        chalk.gray("===================================================="),
        chalk.bgGreen.black.bold("  TRIP TO HEAVEN API STARTED  "),
        chalk.gray("===================================================="),
        chalk.green("Database: Connected to MongoDB successfully"),
        chalk.greenBright(`Server: Running on port ${envs.port}`),
        chalk.yellowBright(`Mode: ${envs.nodeEnv}`),
        chalk.cyan(`API: http://localhost:${envs.port}/`),
        chalk.magenta("Hint: Press Ctrl+C to stop the server"),
        chalk.gray("===================================================="),
      ];

      console.log(startupLogs.join("\n"));
    } catch (error) {
      console.error(chalk.red("Error starting server:", error));
    }
  });
};
