import { downloadFileFromS3 } from "../services/s3-fileDownload.service";
import { mockClient } from "aws-sdk-client-mock";
import { S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
jest.mock("@aws-sdk/s3-request-presigner", () => ({
	getSignedUrl: jest.fn().mockResolvedValue("signedUrl"),
}));
describe("downloadFileFromS3", () => {
	let s3ClientMock;

	beforeEach(() => {
		jest.clearAllMocks();
		s3ClientMock = mockClient(S3Client);
	});

	test("should return a signed url", async () => {
		const response = await downloadFileFromS3("testKey");
		expect(getSignedUrl).toHaveBeenCalledWith(
			expect.any(S3Client),
			expect.anything(), // You can be more specific here if needed
			{ expiresIn: 60 } // Match this with your actual function's logic
		);
		expect(response.status).toBe(200);
		expect(response.data).toBe("signedUrl");
	});
	test("should handle errors when generating a signed URL", async () => {
		const mockError = new Error("Failed to generate signed URL");
		(getSignedUrl as jest.Mock).mockRejectedValue(mockError);

		const response = await downloadFileFromS3("testKey");

		expect(getSignedUrl).toHaveBeenCalledWith(expect.any(S3Client), expect.anything(), { expiresIn: 60 });
		expect(response).toEqual({ status: 500, message: mockError });
	});
	// Additional tests...
});
