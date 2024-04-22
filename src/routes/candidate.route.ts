import express, { Router } from "express";
import AuthGuardMiddleware from "../middlewares/authGuard.middleware";
import CandidateController from "../controllers/candidate.controller";

const protectRoute = new AuthGuardMiddleware().protectRoute;

const getAllCandidates = new CandidateController().getAllCandidates;

const getOneCandidate = new CandidateController().getOneCandidate;

const getCVDownloadUrl = new CandidateController().getDownloadURL;

const router: Router = express.Router();

router.get("/all", protectRoute(["recruiter"]), getAllCandidates);

router.get("/:user_id", protectRoute(["recruiter"]), getOneCandidate);

router.get("/cv/:key", protectRoute(["recruiter"]), getCVDownloadUrl);

export default router;
