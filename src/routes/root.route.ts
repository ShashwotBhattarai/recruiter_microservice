import express, { Router } from "express";
import candidateRoute from "./candidate.route";
import healthRoute from "./health.route";

const router: Router = express.Router();

router.use("/getCandidateInfo", candidateRoute);
router.use("/health", healthRoute);

export default router;
