import mongoose from "mongoose";
import logger from "./logger.config";
import { envVars } from "./envVars.config";

async function connectToDatabase(): Promise<void> {
  try {
    await mongoose.connect(envVars.DATABASEURI as string);
    logger.info("Connected to database successfully");
  } catch (error) {
    logger.error("Unknown error in connecting to database", error);
  }
}

export default connectToDatabase;
