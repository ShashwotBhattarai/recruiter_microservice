import express, { Router, Request, Response } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { CandidateInfo } from "../database/models/candidateInfo.model";

const router: Router = express.Router();

router.get("/all", authMiddleware(["recruiter"]), async (req: Request, res: Response) => {
	try {
		const candidates = await CandidateInfo.find();
		if (candidates == null) {
			res.status(404).json({ message: "No candidates found" });
		} else {
			res.status(200).send(candidates);
		}
	} catch (error) {
		res.send(500).json({ error: error });
	}
});

router.get("/:user_id", authMiddleware(["recruiter"]), async (req: Request, res: Response) => {
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
		res.status(500).send({ error: error });
	}
});

export default router;
