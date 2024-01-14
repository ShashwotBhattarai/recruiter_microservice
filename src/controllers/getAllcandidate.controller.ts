import { Request, Response } from "express";

import { CandidateInfo } from "../database/models/candidateInfo.model";

export const getAllcandidateController = (req: Request, res: Response) => {
	(async () => {
		try {
			const candidates = await CandidateInfo.find();
			if (candidates == null) {
				res.status(404).json({ message: "No candidates found" });
			} else {
				res.status(200).send(candidates);
			}
		} catch (error) {
			res.status(500).json({ error: "internal server error" });
		}
	})();
};
