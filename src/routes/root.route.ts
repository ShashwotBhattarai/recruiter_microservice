import express, { Router } from "express";
import fileDownloadRoute from "./fileDownload.route";
import getCandidateInfoRoute from "./getCandidateInfo.route";
import healthRoute from "./health.route";

const router: Router = express.Router();

router.use("/recruiter/download", fileDownloadRoute);
router.use("/recruiter/getCandidateInfo", getCandidateInfoRoute);
router.use("/health", healthRoute);

export default router;
