import express from "express";
import {
  PutObjectCommand,
  S3Client,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { config } from "dotenv";
import multer from "multer";
import generateUniqueId from "generate-unique-id";
import cors from "cors";
import fs from "fs-extra";

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

export const upload_main = async (buffer, type) => {
  const command = new PutObjectCommand({
    Bucket: "resumetrackerbucket",
    Key: generateUniqueId(),
    Body: buffer,
    ContentType: type,
  });

  try {
    const response = await client.send(command);
    console.log(response);
    return response;
  } catch (err) {
    console.error(err);
  }
};
const storage1 = multer.memoryStorage();
const upload = multer({ storage: storage1 });

app.post("/test-upload", upload.single("cv"), async (req, res) => {
  console.log(req.file);
  const response = await upload_main(req.file.buffer, req.file.mimetype);

  res.send(response);
});

let localFilePath;

// export const download_main = async (key) => {
//   const command = new GetObjectCommand({
//     Bucket: "resumetrackerbucket",
//     Key: key,
//   });

//   try {
//     const response = await client.send(command);
//     // The Body object also has 'transformToByteArray' and 'transformToWebStream' methods.
//     const str = await response.Body.transformToByteArray();

//     localFilePath = `./downloads/${key}.pdf`; // Adjust the path and filename as needed
//     fs.writeFile(localFilePath, str);

//     return str;
//   } catch (err) {
//     console.error(err);
//   }
// };

app.get("/test-download", async (req, res) => {
  const key = req.body.key;
  // const str = await download_main(key);

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
