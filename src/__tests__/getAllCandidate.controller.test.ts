import { Request, Response } from "express";
import { getAllcandidateController } from "../controllers/getAllcandidate.controller"; // Adjust the import path
import { CandidateInfo } from "../database/models/candidateInfo.model"; // Adjust the import path

jest.mock("../database/models/candidateInfo.model"); // Mock CandidateInfo model

describe("getAllcandidateController", () => {
	let mockRequest: any;
	let mockResponse: any;
	let jsonResponse: any;

	beforeEach(() => {
		mockRequest = {};
		jsonResponse = {};
		mockResponse = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn().mockImplementation((result) => (jsonResponse = result)),
			send: jest.fn().mockImplementation((result) => (jsonResponse = result)),
		};

		jest.clearAllMocks();
	});

	it("should return all candidates when they are found", (done) => {
		CandidateInfo.find = jest.fn().mockResolvedValue(["candidate1", "candidate2"]);

		getAllcandidateController(mockRequest as unknown as Request, mockResponse as unknown as Response);

		setImmediate(() => {
			expect(mockResponse.status).toHaveBeenCalledWith(200);
			expect(jsonResponse).toEqual(["candidate1", "candidate2"]);
			done();
		});
	});

	it("should return a 404 when no candidates are found", (done) => {
		CandidateInfo.find = jest.fn().mockResolvedValue(null);

		getAllcandidateController(mockRequest as unknown as Request, mockResponse as unknown as Response);

		setImmediate(() => {
			expect(mockResponse.status).toHaveBeenCalledWith(404);
			expect(jsonResponse).toEqual({ message: "No candidates found" });
			done();
		});
	});

	it("should handle errors", (done) => {
		CandidateInfo.find = jest.fn().mockRejectedValue(new Error("Error fetching candidates"));

		getAllcandidateController(mockRequest as unknown as Request, mockResponse as unknown as Response);

		setImmediate(() => {
			expect(mockResponse.status).toHaveBeenCalledWith(500);
			expect(jsonResponse).toEqual({ error: "internal server error" });
			done();
		});
	});
});
