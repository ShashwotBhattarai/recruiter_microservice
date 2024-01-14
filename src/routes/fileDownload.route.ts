import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { fileDownloadController } from "../controllers/fileDownload.controller";

const router = express.Router();

router.post("/", authMiddleware(["recruiter"]), fileDownloadController);

export default router;
