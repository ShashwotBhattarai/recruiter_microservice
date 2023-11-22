import express from "express";
import {
  S3Client,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { config } from "dotenv";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

config();

const client = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_REGION,
});

app.get("/test-download", async (req, res) => {
  const key = req.body.key;

  const command = new GetObjectCommand({
    Bucket: "resumetrackerbucket",
    Key: key,
  });

  const imageUrl = await getSignedUrl(
    client,
    command,
    {
      expiresIn: 60,
    }
  );
  res.setHeader('Content-Disposition', `attachment; filename=${key}.pdf`);
  res.send(imageUrl);
});

app.listen(9000);
console.log("Server up and running...");
