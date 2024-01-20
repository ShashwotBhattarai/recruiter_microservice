import { Request, Response } from "express";

import { CandidateInfo } from "../database/models/candidateInfo.model";
import logger from "../configs/logger.config";

export const getAllcandidateController = (req: Request, res: Response) => {
	(async () => {
		try {
			const candidates = await CandidateInfo.find();
			if (candidates == null) {
				logger.info("No candidates found");
				res.status(404).json({ message: "No candidates found" });
			} else {
				logger.info("Candidates found");
				res.status(200).send(candidates);
			}
		} catch (error) {
			logger.error("Unknown error in getAllcandidateController", error);
			res.status(500).json({ error: "internal server error" });
		}
	})();
};
