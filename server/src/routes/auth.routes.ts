import express from "express";
import { registerUser, loginUser,refreshToken } from "../controllers/auth.controller.js";
import { auth } from "firebase-admin";
const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/refresh", refreshToken);

export default authRouter;
