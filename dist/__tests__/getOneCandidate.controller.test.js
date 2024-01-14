"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getOneCandidate_controller_1 = require("../controllers/getOneCandidate.controller");
const candidateInfo_model_1 = require("../database/models/candidateInfo.model");
jest.mock("../database/models/candidateInfo.model");
describe("getOneCandidateController", () => {
    let mockRequest;
    let mockResponse;
    let jsonResponse;
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
        candidateInfo_model_1.CandidateInfo.findOne = jest.fn().mockResolvedValue({ name: "John Doe", user_id: "testUserId" });
        (0, getOneCandidate_controller_1.getOneCandidateController)(mockRequest, mockResponse);
        setImmediate(() => {
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(jsonResponse).toEqual({ name: "John Doe", user_id: "testUserId" });
            done();
        });
    });
    it("should return a 404 when candidate is not found", (done) => {
        candidateInfo_model_1.CandidateInfo.findOne = jest.fn().mockResolvedValue(null);
        (0, getOneCandidate_controller_1.getOneCandidateController)(mockRequest, mockResponse);
        setImmediate(() => {
            expect(mockResponse.status).toHaveBeenCalledWith(404);
            expect(jsonResponse).toEqual({ message: "candidatre with that user_id not found" });
            done();
        });
    });
    it("should handle errors", (done) => {
        candidateInfo_model_1.CandidateInfo.findOne = jest.fn().mockRejectedValue(new Error("Error fetching candidate"));
        (0, getOneCandidate_controller_1.getOneCandidateController)(mockRequest, mockResponse);
        setImmediate(() => {
            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(jsonResponse).toEqual({ error: "internal server error" });
            done();
        });
    });
});
