import mongoose from "mongoose";
import * as dotenv from "dotenv";
import logger from "../configs/logger.config";

dotenv.config();

async function connectToDatabase(): Promise<void> {
	try {
		await mongoose.connect(process.env.DATABASEURI as string);
		logger.info("Connected to database successfully");
	} catch (error) {
		logger.error("Unknown error in connecting to database", error);
	}
}

export default connectToDatabase;
