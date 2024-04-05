/* eslint-disable @typescript-eslint/no-explicit-any */
import GetDownloadURLService from "./downloadUrl.service";
import S3DownloadService from "./s3.service";
import CandidateService from "./candidateInfo.service";
import SQSService from "./sqs.service";

jest.mock("./s3.service");
jest.mock("./candidateInfo.service");
jest.mock("./sqs.service");

describe("GetDownloadURLService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 200, download URL and call sendMessageToQueue method", async () => {
    const key = "exampleKey";
    const downloadUrl = "https://example.com/download";
    const findUserResponse = {
      data: {
        fullname: "John Doe",
        email: "john@example.com",
      },
    };

    (
      S3DownloadService.prototype as any
    ).getDownloadURLFromS3.mockResolvedValueOnce({ url: downloadUrl });
    (CandidateService.prototype as any).findOneCandidate.mockResolvedValueOnce(
      findUserResponse,
    );
    (SQSService.prototype as any).sendMessageToQueue.mockResolvedValueOnce();

    const service = new GetDownloadURLService();
    const response = await service.getCVDownloadUrl(key);

    expect(response.status).toBe(200);
    expect(response.url).toBe(downloadUrl);
    expect(SQSService.prototype.sendMessageToQueue).toHaveBeenCalled();
  });

  it("should throw an error Unknown error in Download URL download if any step fails in try block", async () => {
    const key = "exampleKey";

    (
      S3DownloadService.prototype as any
    ).getDownloadURLFromS3.mockRejectedValueOnce(
      new Error("S3 download error"),
    );

    const service = new GetDownloadURLService();

    await expect(service.getCVDownloadUrl(key)).rejects.toEqual(
      new Error("Unknown error in Download URL download"),
    );
  });
});
