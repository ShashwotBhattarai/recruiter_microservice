import express, { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { getAllcandidateController } from "../controllers/getAllcandidate.controller";
import { getOneCandidateController } from "../controllers/getOneCandidate.controller";

const router: Router = express.Router();

router.get("/all", authMiddleware(["recruiter"]), getAllcandidateController);

router.get(
  "/:user_id",
  authMiddleware(["recruiter"]),
  getOneCandidateController,
);

export default router;
