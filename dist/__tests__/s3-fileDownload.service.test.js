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
const s3_fileDownload_service_1 = require("../services/s3-fileDownload.service");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
jest.mock("@aws-sdk/s3-request-presigner", () => ({
    getSignedUrl: jest.fn().mockResolvedValue("signedUrl"),
}));
describe("downloadFileFromS3", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test("should return a signed url", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, s3_fileDownload_service_1.downloadFileFromS3)("testKey");
        expect(s3_request_presigner_1.getSignedUrl).toHaveBeenCalledWith(expect.any(client_s3_1.S3Client), expect.anything(), // You can be more specific here if needed
        { expiresIn: 60 } // Match this with your actual function's logic
        );
        expect(response.status).toBe(200);
        expect(response.data).toBe("signedUrl");
    }));
    test("should handle errors when generating a signed URL", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockError = new Error("Failed to generate signed URL");
        s3_request_presigner_1.getSignedUrl.mockRejectedValue(mockError);
        try {
            yield (0, s3_fileDownload_service_1.downloadFileFromS3)("testKey");
        }
        catch (error) {
            expect(error).toEqual(new Error("error in downloadFileFromS3"));
        }
    }));
});
