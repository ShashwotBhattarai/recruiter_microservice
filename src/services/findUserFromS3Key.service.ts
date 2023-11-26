import { CandidateInfo } from "../database/models/candidateInfo.model";

export class FindUser {
	async findUser(key: string) {
		try {
			const response = await CandidateInfo.findOne({ aws_file_key: key });
			const email = response?.email;
			const fullname = response?.fullname;

			return {
				status: 200,
				email: email,
				fullname: fullname,
			};
		} catch (err) {
			return {
				status: 500,
				message: err,
			};
		}
	}
}
