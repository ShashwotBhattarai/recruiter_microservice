import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { config } from "dotenv";
import { createS3Client } from "./createS3Client.service";
config();

export async function downloadFileFromS3(key: string) {
	try {
		const createS3ClientResponse = await createS3Client();
		const client = createS3ClientResponse.data as S3Client;
		const imageUrl = await getSignedUrl(
			client,
			new GetObjectCommand({
				Bucket: "resumetrackerbucket",
				Key: key,
			}),
			{
				expiresIn: 60,
			}
		);
		return { status: 200, message: "url downloaded", data: imageUrl };
	} catch (err) {
		return { status: 500, message: err };
	}
}
