import { downloadFileFromS3 } from "../services/s3-fileDownload.service";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

jest.mock("@aws-sdk/client-s3", () => ({
	GetObjectCommand: jest.fn(),
}));

jest.mock("@aws-sdk/s3-request-presigner");

describe("downloadFileFromS3", () => {
	const mockClient = {}; // Mock client object

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test("successfully downloads file from S3", async () => {
		(getSignedUrl as jest.MockedFunction<typeof getSignedUrl>).mockResolvedValue(
			"https://s3.amazonaws.com/resumetrackerbucket/file.pdf"
		);

		const result = await downloadFileFromS3("file.pdf", mockClient);

		expect(result.status).toBe(200);
		expect(result.message).toBe("url downloaded");
		expect(result.data).toBe("https://s3.amazonaws.com/resumetrackerbucket/file.pdf");
	});

	test("handles S3 error", async () => {
		(getSignedUrl as jest.MockedFunction<typeof getSignedUrl>).mockRejectedValue(
			new Error("Failed to get object")
		);

		const result = await downloadFileFromS3("file.pdf", mockClient);

		expect(result.status).toBe(500);
		expect(result.message).toBeDefined();
	});
});
