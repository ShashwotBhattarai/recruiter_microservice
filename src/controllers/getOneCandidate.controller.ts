import { Request, Response } from "express";
import { CandidateInfo } from "../models/candidateInfo.model";
import logger from "../configs/logger.config";

export const getOneCandidateController = (req: Request, res: Response) => {
	(async () => {
		try {
			const candidate = await CandidateInfo.findOne({
				user_id: req.params.user_id,
			});

			if (candidate == null) {
				logger.info("Candidatre with that user_id not found");
				res.status(404).json({ message: "candidatre with that user_id not found" });
			} else {
				logger.info("Candidate found");
				res.status(200).send(candidate);
			}
		} catch (error) {
			logger.error("Unknown error in getOneCandidateController", error);
			res.status(500).send({ error: "internal server error" });
		}
	})();
};
