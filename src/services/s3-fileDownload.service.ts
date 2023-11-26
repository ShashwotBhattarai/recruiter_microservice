import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { config } from "dotenv";
config();

class S3FileDownloadService {
	async downloadFileToS3(key: string) {
		const client = new S3Client({
			credentials: {
				accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
				secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
			},
			region: process.env.AWS_REGION,
		});

		const command = new GetObjectCommand({
			Bucket: "resumetrackerbucket",
			Key: key,
		});

		try {
			const imageUrl = await getSignedUrl(client, command, {
				expiresIn: 60,
			});
			return { status: 200, message: imageUrl };
		} catch (err) {
			return { status: 500, message: err };
		}
	}
}

export default S3FileDownloadService;
