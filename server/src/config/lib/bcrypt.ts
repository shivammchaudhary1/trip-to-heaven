import bcrypt from "bcryptjs";
import envs from "../environment/envs.js";
import type {
  IBcryptRequest,
  IBryptCompareRequest,
} from "../../interface/lib.types.js";

export const hasPassword = async ({
  password,
}: IBcryptRequest): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(envs.saltRounds);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    console.error("Error hashing password:", error);
    throw new Error("Password hashing failed");
  }
};

export const comparePassword = async ({
  password,
  hashedPassword,
}: IBryptCompareRequest): Promise<boolean> => {
  console.log("Comparing passwords:", password, hashedPassword);
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    console.error("Error comparing password:", error);
    throw new Error("Password comparison failed");
  }
};
