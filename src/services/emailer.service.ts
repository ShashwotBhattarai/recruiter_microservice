import { EmailPayload } from "../models/emailPayload.type";
import logger from "../configs/logger.config";
import SQSService from "./sqs.service";
import { ServiceResponse } from "../models/serviceResponse.type";
import { CVHasBeenDownloadedEmailTemplate } from "../constants/email.templates";

export class EmailerService {
  private sqsService = new SQSService();

  public async constructEmailPayload(
    email: string,
    subject: string,
    text: string,
  ): Promise<EmailPayload> {
    const emailPayload: EmailPayload = {
      to: email,
      subject: subject,
      text: text,
    };
    logger.info("Email payload created successfully");
    return emailPayload;
  }

  public async sendEmail(
    email: string,
    username: string,
  ): Promise<ServiceResponse> {
    let subject: string = "";
    let text: string = "";

    subject = CVHasBeenDownloadedEmailTemplate.subject;
    text = CVHasBeenDownloadedEmailTemplate.text.replace(
      "{{username}}",
      username,
    );

    try {
      const emailPayload = await this.constructEmailPayload(
        email,
        subject,
        text,
      );
      const response = await this.sqsService.sendMessageToQueue(emailPayload);
      logger.info("message sent to queue", response);
      return {
        status: 200,
        message: "message sent to queue",
      };
    } catch (error) {
      throw new Error("Error in sendEmail");
    }
  }
}
