import express, { Request, Response } from "express";
import { downloadFileFromS3 } from "../services/s3-fileDownload.service";
import { authMiddleware } from "../middlewares/auth.middleware";
import { SQSService } from "../services/sqs.service";
import { FindUser } from "../services/findUserFromS3Key.service";
import { EmailPayload } from "../interfaces/emailPayload.interface";
const router = express.Router();

router.post("/", authMiddleware(["recruiter"]), async (req: Request, res: Response) => {
	const key = req.body.key;
	const downloadFileResponse = await downloadFileFromS3(key);

	if (downloadFileResponse.status == 200) {
		const findUserResponse = await new FindUser().findUser(key);
		if (findUserResponse.status == 200) {
			const email = findUserResponse.email ?? "";
			const fullname = findUserResponse.fullname;

			const emailPayload: EmailPayload = {
				to: email,
				subject: "Hi " + fullname + " " + " Your CV Got Downloaded",
				text: "Dear candidate your CV was downloaded",
			};
			await new SQSService().sendMessageToQueue(emailPayload);
		}

		res.setHeader("Content-Disposition", `attachment; filename=${key}.pdf`);
		res.status(downloadFileResponse.status).send({ url: downloadFileResponse.data });
	} else {
		res.status(downloadFileResponse.status).send({ error: downloadFileResponse.message });
	}
});

export default router;
