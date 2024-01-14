import { Request, Response } from "express";
import { downloadFileFromS3 } from "../services/s3-fileDownload.service";
import { SQSService } from "../services/sqs.service";
import { FindUser } from "../services/findUserFromS3Key.service";
import { EmailPayload } from "../interfaces/emailPayload.interface";
export const fileDownloadController = (req: Request, res: Response) => {
	(async () => {
		const key = req.body.key;
		try {
			const downloadFileResponse = await downloadFileFromS3(key);

			const findUserResponse = await new FindUser().findUser(key);

			const email = findUserResponse.email;
			const fullname = findUserResponse.fullname;

			const emailPayload: EmailPayload = {
				to: email,
				subject: "Hi " + fullname + " " + " Your CV Got Downloaded",
				text: "Dear candidate your CV was downloaded",
			};
			await new SQSService().sendMessageToQueue(emailPayload);

			res.setHeader("Content-Disposition", `attachment; filename=${key}.pdf`);
			res.status(downloadFileResponse.status).send({ url: downloadFileResponse.data });
		} catch (error) {
			res.status(500).send({ error: "internal server error" });
		}
	})();
};
