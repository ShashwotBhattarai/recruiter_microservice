import express, { Router } from "express";
import AuthGuardMiddleware from "../middlewares/authGuard.middleware";
import CandidateController from "../controllers/candidate.controller";

const protectRoute = new AuthGuardMiddleware().protectRoute;

const getAllCandidateController = new CandidateController()
  .getAllcandidateController;

const getOneCandidateController = new CandidateController()
  .getOneCandidateController;

const router: Router = express.Router();

router.get("/all", protectRoute(["recruiter"]), getAllCandidateController);

router.get("/:user_id", protectRoute(["recruiter"]), getOneCandidateController);

export default router;
