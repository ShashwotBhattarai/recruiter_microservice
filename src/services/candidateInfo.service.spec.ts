import CandidateService from "./candidateInfo.service";
import { CandidateInfo } from "../entities/candidateInfo.entity";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mockingoose = require("mockingoose");
import logger from "../configs/logger.config";

jest.mock("../configs/logger.config");

describe("CandidateService", () => {
  afterEach(() => {
    jest.clearAllMocks();
    mockingoose.resetAll();
  });

  describe("findOneCandidate", () => {
    it("should return 200 and candidate found response when candidate exists", async () => {
      const mockCandidate = {
        _id: "exampleId",
        fullname: "John Doe",
        email: "john@example.com",
      };

      mockingoose(CandidateInfo).toReturn(mockCandidate, "findOne");

      const service = new CandidateService();
      const response = await service.findOneCandidate({ _id: "exampleId" });

      expect(response.status).toBe(200);
      expect(response.message).toBe("Candidate found");

      expect(logger.info).toHaveBeenCalledWith("Candidate found");
    });

    it("should return 404 and Candidate with this id doesn't exists response when candidate does not exist", async () => {
      mockingoose(CandidateInfo).toReturn(null, "findOne");

      const service = new CandidateService();
      const response = await service.findOneCandidate({ _id: "nonExistentId" });

      expect(response.status).toBe(404);
      expect(response.message).toBe("Candidate with this id doesn't exists");

      expect(logger.error).toHaveBeenCalledWith(
        "Candidate with this id doesn't exists",
      );
    });

    it("should return Unknown error in findOneCandidate response when an error occurs", async () => {
      mockingoose(CandidateInfo).toReturn(
        new Error("Unexpected error"),
        "findOne",
      );

      const service = new CandidateService();
      await expect(
        service.findOneCandidate({ _id: "exampleId" }),
      ).rejects.toEqual(new Error("Unknown error in findOneCandidate"));

      expect(logger.error).toHaveBeenCalledWith(
        "Unknown error in findOneCandidate",
        new Error("Unexpected error"),
      );
    });
  });

  describe("findAllCandidates", () => {
    it("should return 200 candidates found response when candidates exist", async () => {
      const mockCandidates = [
        {
          _id: "exampleId1",
          fullname: "John Doe",
          email: "john@example.com",
        },
        {
          _id: "exampleId2",
          fullname: "Jane Doe",
          email: "jane@example.com",
        },
      ];

      mockingoose(CandidateInfo).toReturn(mockCandidates, "find");

      const service = new CandidateService();
      const response = await service.findAllCandidates();

      expect(response.status).toBe(200);
      expect(response.message).toBe("Candidates found");
    });

    it("should return 404 and No candidate exists response when no candidate exists", async () => {
      mockingoose(CandidateInfo).toReturn(null, "find");

      const service = new CandidateService();
      const response = await service.findAllCandidates();

      expect(response.status).toBe(404);
      expect(response.message).toBe("No candidate exists");
    });

    it("should return Unknown error in findAllCandidate response when an error occurs", async () => {
      mockingoose(CandidateInfo).toReturn(
        new Error("Unexpected error"),
        "find",
      );

      const service = new CandidateService();

      await expect(service.findAllCandidates()).rejects.toEqual(
        new Error("Unknown error in findAllCandidate"),
      );

      expect(logger.error).toHaveBeenCalledWith(
        "Unknown error in findAllCandidate",
        new Error("Unexpected error"),
      );
    });
  });
});
