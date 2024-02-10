import { Request, Response } from "express";
import { getOneCandidateController } from "../controllers/getOneCandidate.controller";
import { CandidateInfo } from "../models/candidateInfo.model";

jest.mock("../models/candidateInfo.model");

describe("getOneCandidateController", () => {
	let mockRequest: any;
	let mockResponse: any;
	let jsonResponse: any;

	beforeEach(() => {
		mockRequest = {
			params: {
				user_id: "testUserId",
			},
		};

		jsonResponse = {};
		mockResponse = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn().mockImplementation((result) => (jsonResponse = result)),
			send: jest.fn().mockImplementation((result) => (jsonResponse = result)),
		};

		jest.clearAllMocks();
	});

	it("should return a candidate when found", (done) => {
		CandidateInfo.findOne = jest.fn().mockResolvedValue({ name: "John Doe", user_id: "testUserId" });

		getOneCandidateController(mockRequest as unknown as Request, mockResponse as unknown as Response);

		setImmediate(() => {
			expect(mockResponse.status).toHaveBeenCalledWith(200);
			expect(jsonResponse).toEqual({ name: "John Doe", user_id: "testUserId" });
			done();
		});
	});

	it("should return a 404 when candidate is not found", (done) => {
		CandidateInfo.findOne = jest.fn().mockResolvedValue(null);

		getOneCandidateController(mockRequest as unknown as Request, mockResponse as unknown as Response);

		setImmediate(() => {
			expect(mockResponse.status).toHaveBeenCalledWith(404);
			expect(jsonResponse).toEqual({ message: "candidatre with that user_id not found" });
			done();
		});
	});

	it("should handle errors", (done) => {
		CandidateInfo.findOne = jest.fn().mockRejectedValue(new Error("Error fetching candidate"));

		getOneCandidateController(mockRequest as unknown as Request, mockResponse as unknown as Response);

		setImmediate(() => {
			expect(mockResponse.status).toHaveBeenCalledWith(500);
			expect(jsonResponse).toEqual({ error: "internal server error" });
			done();
		});
	});
});
