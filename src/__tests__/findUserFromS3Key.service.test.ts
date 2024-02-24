import { FindUser } from "../services/findUserFromS3Key.service"; // Adjust the import path as needed
import { CandidateInfo } from "../models/candidateInfo.model";

jest.mock("../models/candidateInfo.model"); // Mock the CandidateInfo model

describe("FindUser", () => {
  let findUser: InstanceType<typeof FindUser>;

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

    expect(CandidateInfo.findOne).toHaveBeenCalledWith({
      aws_file_key: "some-key",
    });
    expect(result).toEqual({
      status: 200,
      email: "test@example.com",
      fullname: "Test User",
    });
  });
  it("user not found", async () => {
    CandidateInfo.findOne = jest.fn().mockResolvedValue(null);

    try {
      await findUser.findUser("some-key");
    } catch (error) {
      expect(CandidateInfo.findOne).toHaveBeenCalledWith({
        aws_file_key: "some-key",
      });
      expect(error).toEqual(new Error("Error in finding user"));
    }
  });

  it("handles errors when finding a user", async () => {
    const errorMessage = "Error finding user";
    CandidateInfo.findOne = jest
      .fn()
      .mockRejectedValue(new Error(errorMessage));
    try {
      await findUser.findUser("invalid-key");
    } catch (error) {
      expect(error).toEqual(new Error("Error in finding user"));
    }
  });
});
