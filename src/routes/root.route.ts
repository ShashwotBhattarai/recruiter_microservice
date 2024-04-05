import express, { Router } from "express";
import urlDownloadRoute from "./urlDownload.route";
import candidateRoute from "./candidate.route";
import healthRoute from "./health.route";

const router: Router = express.Router();

router.use("/download", urlDownloadRoute);
router.use("/getCandidateInfo", candidateRoute);
router.use("/health", healthRoute);

export default router;
