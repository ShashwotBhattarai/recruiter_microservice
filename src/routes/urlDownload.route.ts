import express, { Router } from "express";
import AuthGuardMiddleware from "../middlewares/authGuard.middleware";
import GetCandidateInfoController from "../controllers/candidate.controller";

const protectRoute = new AuthGuardMiddleware().protectRoute;
const getCVDownloadUrl = new GetCandidateInfoController().getDownloadURL;

const router: Router = express.Router();

router.get("/:key", protectRoute(["recruiter"]), getCVDownloadUrl);

export default router;
