"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fileDownload_controller_1 = require("../controllers/fileDownload.controller");
jest.mock("../services/s3-fileDownload.service", () => ({
    downloadFileFromS3: jest.fn(),
}));
jest.mock("../services/findUserFromS3Key.service", () => ({
    FindUser: jest.fn().mockImplementation(() => ({
        findUser: jest.fn(),
    })),
}));
jest.mock("../services/sqs.service", () => ({
    SQSService: jest.fn().mockImplementation(() => ({
        sendMessageToQueue: jest.fn(),
    })),
}));
describe("fileDownloadController", () => {
    let mockRequest;
    let mockResponse;
    let jsonResponse;
    let setHeaderSpy;
    beforeEach(() => {
        mockRequest = {
            body: {
                key: "testKey",
            },
        };
        jsonResponse = {};
        setHeaderSpy = jest.fn();
        mockResponse = {
            setHeader: setHeaderSpy,
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockImplementation((result) => (jsonResponse = result)),
        };
        jest.clearAllMocks();
    });
    it("should handle successful file download and send email notification", (done) => {
        const { downloadFileFromS3 } = require("../services/s3-fileDownload.service");
        const { FindUser } = require("../services/findUserFromS3Key.service");
        const { SQSService } = require("../services/sqs.service");
        downloadFileFromS3.mockResolvedValue({ status: 200, data: "fileData" });
        FindUser.mockImplementation(() => ({
            findUser: jest
                .fn()
                .mockResolvedValue({ status: 200, email: "email@example.com", fullname: "John Doe" }),
        }));
        SQSService.mockImplementation(() => ({
            sendMessageToQueue: jest.fn().mockResolvedValue({}),
        }));
        (0, fileDownload_controller_1.fileDownloadController)(mockRequest, mockResponse);
        setImmediate(() => {
            expect(setHeaderSpy).toHaveBeenCalledWith("Content-Disposition", "attachment; filename=testKey.pdf");
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(jsonResponse).toEqual({ url: "fileData" });
            done();
        });
    });
    it("should handle internal server error", (done) => {
        const { downloadFileFromS3 } = require("../services/s3-fileDownload.service");
        downloadFileFromS3.mockRejectedValue(new Error("Internal server error"));
        (0, fileDownload_controller_1.fileDownloadController)(mockRequest, mockResponse);
        setImmediate(() => {
            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(jsonResponse).toEqual({ error: "internal server error" });
            done();
        });
    });
});
