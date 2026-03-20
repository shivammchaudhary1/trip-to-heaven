import User from "../models/user.model.js";
import { Request, Response } from "express";

const getUserProfile = async (req: Request, res: Response) => {};
const updateUserProfile = async (req: Request, res: Response) => {};
const deleteUserProfile = async (req: Request, res: Response) => {};
const getAllUsers = async (req: Request, res: Response) => {};
const getUserById = async (req: Request, res: Response) => {};

export {
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
  getAllUsers,
  getUserById,
};
