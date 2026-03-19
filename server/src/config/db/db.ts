import mongoose from "mongoose";
import envs from "../environment/envs.js";

export const connectDB = async () => {
  await mongoose.connect(envs.mongoUri);
};
