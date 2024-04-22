import S3Service from "./s3.service";
import { S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

jest.mock("@aws-sdk/s3-request-presigner", () => ({
  getSignedUrl: jest.fn().mockResolvedValue("signedUrl"),
}));

describe("downloadFileFromS3", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 200 and a signed url", async () => {
    const response = await new S3Service().getDownloadURLFromS3("testKey");
    expect(getSignedUrl).toHaveBeenCalledWith(
      expect.any(S3Client),
      expect.anything(),
      { expiresIn: 60 },
    );
    expect(response.status).toBe(200);
    expect(response.url).toBe("signedUrl");
  });
  it("should throw error in downloadFileFromS3  if getSignedUrl fails", async () => {
    const mockError = new Error("Failed to generate signed URL");
    (getSignedUrl as jest.Mock).mockRejectedValue(mockError);

    try {
      await new S3Service().getDownloadURLFromS3("testKey");
    } catch (error) {
      expect(error).toEqual(new Error("error in downloadFileFromS3"));
    }
  });
});
