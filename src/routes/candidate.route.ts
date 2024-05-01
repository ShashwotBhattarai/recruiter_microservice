import express, { Router } from "express";
import AuthGuardMiddleware from "../middlewares/authGuard.middleware";
import CandidateController from "../controllers/candidate.controller";

const protectRoute = new AuthGuardMiddleware().protectRoute;

const candidateController = new CandidateController();
const getAllCandidates =
  candidateController.getAllCandidates.bind(candidateController);
const getOneCandidate =
  candidateController.getOneCandidate.bind(candidateController);
const getCVDownloadUrl =
  candidateController.getDownloadURL.bind(candidateController);

const router: Router = express.Router();

router.get("/all", protectRoute(["recruiter"]), getAllCandidates);
router.get("/:user_id", protectRoute(["recruiter"]), getOneCandidate);
router.get("/cv/:key", protectRoute(["recruiter"]), getCVDownloadUrl);

export default router;
