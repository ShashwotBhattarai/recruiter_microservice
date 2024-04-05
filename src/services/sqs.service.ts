import { SendMessageCommand } from "@aws-sdk/client-sqs";
import generateUniqueId from "generate-unique-id";
import sqsClient from "../configs/sqsClient.config";
import { EmailPayload } from "../models/emailPayload.type";
import logger from "../configs/logger.config";
import { envVars } from "../configs/envVars.config";
import { ServiceResponse } from "../models/serviceResponse.type";

export default class SQSService {
  public async sendMessageToQueue(
    emailPayload: EmailPayload,
  ): Promise<ServiceResponse> {
    try {
      const sqsQueueUrl = envVars.SQS_QUEUE_URL;

      await sqsClient.send(
        new SendMessageCommand({
          QueueUrl: sqsQueueUrl,
          MessageAttributes: {
            To: {
              DataType: "String",
              StringValue: emailPayload.to,
            },
            Subject: {
              DataType: "String",
              StringValue: emailPayload.subject,
            },
          },
          MessageBody: emailPayload.text,
          MessageGroupId: "sendEmailResumeTracker",
          MessageDeduplicationId: generateUniqueId(),
        }),
      );
      logger.info("Message sent to Emailer SQS queue");
      return { status: 200, message: "message sent to queue", data: null };
    } catch (error) {
      logger.error("Unknown error in sending message to queue", error);
      throw new Error("error in sendMessageToQueue");
    }
  }
}
