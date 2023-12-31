import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { config } from "dotenv";
config();

export async function downloadFileFromS3(key: string, client: any) {
	try {
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
		return { status: 200,message:"url downloaded", data: imageUrl };
	} catch (err) {
		return { status: 500, message: err };
	}
}
