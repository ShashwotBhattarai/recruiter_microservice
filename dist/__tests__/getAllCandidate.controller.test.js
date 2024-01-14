"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getAllcandidate_controller_1 = require("../controllers/getAllcandidate.controller"); // Adjust the import path
const candidateInfo_model_1 = require("../database/models/candidateInfo.model"); // Adjust the import path
jest.mock("../database/models/candidateInfo.model"); // Mock CandidateInfo model
describe("getAllcandidateController", () => {
    let mockRequest;
    let mockResponse;
    let jsonResponse;
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
        candidateInfo_model_1.CandidateInfo.find = jest.fn().mockResolvedValue(["candidate1", "candidate2"]);
        (0, getAllcandidate_controller_1.getAllcandidateController)(mockRequest, mockResponse);
        setImmediate(() => {
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(jsonResponse).toEqual(["candidate1", "candidate2"]);
            done();
        });
    });
    it("should return a 404 when no candidates are found", (done) => {
        candidateInfo_model_1.CandidateInfo.find = jest.fn().mockResolvedValue(null);
        (0, getAllcandidate_controller_1.getAllcandidateController)(mockRequest, mockResponse);
        setImmediate(() => {
            expect(mockResponse.status).toHaveBeenCalledWith(404);
            expect(jsonResponse).toEqual({ message: "No candidates found" });
            done();
        });
    });
    it("should handle errors", (done) => {
        candidateInfo_model_1.CandidateInfo.find = jest.fn().mockRejectedValue(new Error("Error fetching candidates"));
        (0, getAllcandidate_controller_1.getAllcandidateController)(mockRequest, mockResponse);
        setImmediate(() => {
            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(jsonResponse).toEqual({ error: "internal server error" });
            done();
        });
    });
});
