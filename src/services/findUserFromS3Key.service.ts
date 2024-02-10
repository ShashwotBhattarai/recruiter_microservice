import { CandidateInfo } from "../models/candidateInfo.model";

export class FindUser {
	async findUser(key: string) {
		try {
			const response = await CandidateInfo.findOne({ aws_file_key: key });
			if (response !== null) {
				const email = response.email;
				const fullname = response.fullname;

				return {
					status: 200,
					email: email,
					fullname: fullname,
				};
			} else {
				throw new Error("User not found");
			}
		} catch {
			throw new Error("Error in finding user");
		}
	}
}
