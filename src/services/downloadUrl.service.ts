import logger from "../configs/logger.config";
import { CVHasBeenDownloadedEmailTemplate } from "../constants/email.templates";
import { EmailPayload } from "../models/emailPayload.type";
import { ServiceResponse } from "../models/serviceResponse.type";
import CandidateService from "./candidateInfo.service";
import S3Service from "./s3.service";
import SQSService from "./sqs.service";

export default class DownloadURLService {
  private candiateService = new CandidateService();
  private s3Service = new S3Service();
  private sqsService = new SQSService();

  public async getCVDownloadUrl(key: string): Promise<ServiceResponse> {
    try {
      const downloadFileResponse =
        await this.s3Service.getDownloadURLFromS3(key);

      const query = { s3_default_bucket_file_key: key };

      const findUserResponse =
        await this.candiateService.findOneCandidate(query);

      const emailText: string = CVHasBeenDownloadedEmailTemplate.text.replace(
        "{{username}}",
        findUserResponse.data.fullname,
      );

      const emailPayload: EmailPayload = {
        to: findUserResponse.data.email,
        subject: CVHasBeenDownloadedEmailTemplate.subject,
        text: emailText,
      };

      await this.sqsService.sendMessageToQueue(emailPayload);
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
