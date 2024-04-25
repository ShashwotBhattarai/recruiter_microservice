import logger from "../configs/logger.config";
import { CVHasBeenDownloadedEmailTemplate } from "../constants/email.templates";
import { EmailPayload } from "../models/emailPayload.type";
import { ServiceResponse } from "../models/serviceResponse.type";
import CandidateService from "./candidateInfo.service";
import S3DownloadService from "./s3.service";
import SQSService from "./sqs.service";

export default class DownloadURLService {
  public async getCVDownloadUrl(key: string): Promise<ServiceResponse> {
    try {
      const downloadFileResponse =
        await new S3DownloadService().getDownloadURLFromS3(key);

      const query = { s3_default_bucket_file_key: key };

      const findUserResponse = await new CandidateService().findOneCandidate(
        query,
      );

      const emailText: string = CVHasBeenDownloadedEmailTemplate.text.replace(
        "{{username}}",
        findUserResponse.data.fullname,
      );

      const emailPayload: EmailPayload = {
        to: findUserResponse.data.email,
        subject: CVHasBeenDownloadedEmailTemplate.subject,
        text: emailText,
      };

      await new SQSService().sendMessageToQueue(emailPayload);
      logger.info("File downloaded");

      return {
        status: 200,
        message: "Signed Url Downloaded",
        url: downloadFileResponse.url,
      };
    } catch (error) {
      logger.error("Error in Download URL download", error);
      throw new Error("Unknown error in Download URL download");
    }
  }
}
