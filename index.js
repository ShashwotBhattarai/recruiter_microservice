import express from "express";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { config } from "dotenv";
import multer from "multer";

const app = express();

config();

const client = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_REGION,
});

export const main = async (buffer, name) => {
  const command = new PutObjectCommand({
    Bucket: "resumetrackerbucket",
    Key: name,
    Body: buffer,
  });

  try {
    const response = await client.send(command);
    console.log(response);
    return response;
  } catch (err) {
    console.error(err);
  }
};
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post("/test-upload", upload.single("file"), async (req, res) => {
  const response = await main(req.file.buffer, req.file.originalname);

  res.send(response);
});

app.listen(9000);
console.log("Server up and running...");
