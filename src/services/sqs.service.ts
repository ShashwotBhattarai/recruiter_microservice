import { SendMessageCommand } from "@aws-sdk/client-sqs";
import generateUniqueId from "generate-unique-id";
import dotenv from "dotenv";
import { createSQSClient } from "./createSQSClient.service";
import { EmailPayload } from "../interfaces/emailPayload.interface";
dotenv.config();

export class SQSService {
	async sendMessageToQueue(emailPayload: EmailPayload) {
		try {
			const sqsQueueUrl = process.env.SQS_QUEUE_URL;
			const createSQSClientResponse = await createSQSClient();
			const client = createSQSClientResponse.data;
			await client.send(
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
				})
			);
			return { status: 200, message: "message sent to queue", data: null };
		} catch (error) {
			throw new Error("error in sendMessageToQueue");
		}
	}
}
