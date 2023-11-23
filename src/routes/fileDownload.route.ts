import express, { Request, Response } from "express";
import S3FileDownloadService from "../services/s3-fileDownload.service";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const key = req.body.key;

  const downloadFileResponse =
    await new S3FileDownloadService().downloadFileToS3(key);

  if (downloadFileResponse.status == 200) {
    res.setHeader("Content-Disposition", `attachment; filename=${key}.pdf`);
    res
      .status(downloadFileResponse.status)
      .send({ url: downloadFileResponse.message });
  } else {
    res
      .status(downloadFileResponse.status)
      .send({ error: downloadFileResponse.message });
  }
});

export default router;
