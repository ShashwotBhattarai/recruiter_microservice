"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const findUserFromS3Key_service_1 = require("../services/findUserFromS3Key.service"); // Adjust the import path as needed
const candidateInfo_model_1 = require("../database/models/candidateInfo.model");
jest.mock("../database/models/candidateInfo.model"); // Mock the CandidateInfo model
describe("FindUser", () => {
    let findUser;
    beforeEach(() => {
        findUser = new findUserFromS3Key_service_1.FindUser();
        jest.clearAllMocks();
    });
    it("successfully finds a user", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUser = {
            email: "test@example.com",
            fullname: "Test User",
            aws_file_key: "some-key",
        };
        candidateInfo_model_1.CandidateInfo.findOne = jest.fn().mockResolvedValue(mockUser);
        const result = yield findUser.findUser("some-key");
        expect(candidateInfo_model_1.CandidateInfo.findOne).toHaveBeenCalledWith({ aws_file_key: "some-key" });
        expect(result).toEqual({
            status: 200,
            email: "test@example.com",
            fullname: "Test User",
        });
    }));
    it("handles errors when finding a user", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "Error finding user";
        candidateInfo_model_1.CandidateInfo.findOne = jest.fn().mockRejectedValue(new Error(errorMessage));
        const result = yield findUser.findUser("invalid-key");
        expect(candidateInfo_model_1.CandidateInfo.findOne).toHaveBeenCalledWith({ aws_file_key: "invalid-key" });
        expect(result).toEqual({
            status: 500,
            message: expect.any(Error),
        });
        expect(result.message).toEqual(new Error(errorMessage));
    }));
});
