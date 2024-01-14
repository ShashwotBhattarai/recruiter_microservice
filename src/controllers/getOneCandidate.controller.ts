import { Request, Response } from "express";
import { CandidateInfo } from "../database/models/candidateInfo.model";

export const getOneCandidateController = (req: Request, res: Response) => {
	(async () => {
		try {
			const candidate = await CandidateInfo.findOne({
				user_id: req.params.user_id,
			});

			if (candidate == null) {
				res.status(404).json({ message: "candidatre with that user_id not found" });
			} else {
				res.status(200).send(candidate);
			}
		} catch (error) {
			res.status(500).send({ error: "internal server error" });
		}
	})();
};
