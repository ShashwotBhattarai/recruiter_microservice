import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import logger from "../configs/logger.config";
import { envVars } from "../configs/envVars.config";
import { ServiceResponse } from "../models/serviceResponse.type";
import s3Client from "../configs/s3Client.config";

export default class S3Service {
  public async getDownloadURLFromS3(key: string): Promise<ServiceResponse> {
    try {
      const cvUrl = await getSignedUrl(
        s3Client,
        new GetObjectCommand({
          Bucket: envVars.S3_BUCKET_NAME,
          Key: key,
        }),
        {
          expiresIn: 60,
        },
      );
      logger.info("Url downloaded");
      return { status: 200, message: "url downloaded", url: cvUrl };
    } catch (err) {
      logger.error("Unknown error in downloading file from s3", err);
      throw new Error("error in downloadFileFromS3");
    }
  }
}
