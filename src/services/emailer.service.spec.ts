import { EmailerService } from "./emailer.service";
import { EmailPayload } from "../models/emailPayload.type";
import SQSService from "./sqs.service";

jest.mock("../configs/logger.config");
jest.mock("./sqs.service");

describe("EmailerService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("constructEmailPayload", () => {
    it("should construct email payload according to the params passsed", async () => {
      const subject = "Test Subject";
      const text = "Test Body";
      const email = "test@example.com";

      const emailerService = new EmailerService();
      const result = await emailerService.constructEmailPayload(
        email,
        subject,
        text,
      );

      expect(result.to).toBe(email);
      expect(result.subject).toBe(subject);
      expect(result.text).toBe(text);
    });
  });

  describe("sendEmail", () => {
    it("should responde with status:200 when message is sent to queue", async () => {
      const subject = "Test Subject";
      const text = "Test Body";
      const email = "test@example.com";
      const username = "tesUSername";

      const emailPayload: EmailPayload = {
        to: email,
        subject: subject,
        text: text,
      };

      const constructEmailPayloadSpy = jest.spyOn(
        EmailerService.prototype,
        "constructEmailPayload",
      );
      constructEmailPayloadSpy.mockResolvedValue(emailPayload);

      const sendMessageToQueueSpy = jest.spyOn(
        SQSService.prototype,
        "sendMessageToQueue",
      );
      sendMessageToQueueSpy.mockResolvedValue({
        status: 200,
        message: "message sent to sqs queue",
      });

      const emailerService = new EmailerService();
      const response = await emailerService.sendEmail(email, username);

      expect(response.status).toBe(200);
    });

    it("should respond with error:Error in sendEmail, when any error occures", async () => {
      const subject = "Test Subject";
      const text = "Test Body";
      const email = "test@example.com";
      const username = "tesUSername";

      const emailPayload: EmailPayload = {
        to: email,
        subject: subject,
        text: text,
      };

      const constructEmailPayloadSpy = jest.spyOn(
        EmailerService.prototype,
        "constructEmailPayload",
      );
      constructEmailPayloadSpy.mockResolvedValue(emailPayload);

      const sendMessageToQueueSpy = jest.spyOn(
        SQSService.prototype,
        "sendMessageToQueue",
      );
      sendMessageToQueueSpy.mockRejectedValue(
        new Error("sendMessageToQueue test"),
      );

      const emailerService = new EmailerService();
      try {
        await emailerService.sendEmail(email, username);
      } catch (error) {
        expect(error).toEqual(new Error("Error in sendEmail"));
      }
    });
  });
});
