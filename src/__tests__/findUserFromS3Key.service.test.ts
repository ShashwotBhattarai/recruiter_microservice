import { FindUser } from "../services/findUserFromS3Key.service"; // Adjust the import path as needed
import { CandidateInfo } from "../database/models/candidateInfo.model";

jest.mock("../database/models/candidateInfo.model"); // Mock the CandidateInfo model

describe("FindUser", () => {
	let findUser: any;

	beforeEach(() => {
		findUser = new FindUser();
		jest.clearAllMocks();
	});

	it("successfully finds a user", async () => {
		const mockUser = {
			email: "test@example.com",
			fullname: "Test User",
			aws_file_key: "some-key",
		};

		CandidateInfo.findOne = jest.fn().mockResolvedValue(mockUser);

		const result = await findUser.findUser("some-key");

		expect(CandidateInfo.findOne).toHaveBeenCalledWith({ aws_file_key: "some-key" });
		expect(result).toEqual({
			status: 200,
			email: "test@example.com",
			fullname: "Test User",
		});
	});

	it("handles errors when finding a user", async () => {
		const errorMessage = "Error finding user";
		CandidateInfo.findOne = jest.fn().mockRejectedValue(new Error(errorMessage));

		const result = await findUser.findUser("invalid-key");

		expect(CandidateInfo.findOne).toHaveBeenCalledWith({ aws_file_key: "invalid-key" });
		expect(result).toEqual({
			status: 500,
			message: expect.any(Error),
		});
		expect(result.message).toEqual(new Error(errorMessage));
	});
});
