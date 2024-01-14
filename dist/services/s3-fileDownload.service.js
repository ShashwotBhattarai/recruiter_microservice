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
exports.downloadFileFromS3 = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const dotenv_1 = require("dotenv");
const createS3Client_service_1 = require("./createS3Client.service");
(0, dotenv_1.config)();
function downloadFileFromS3(key) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const createS3ClientResponse = yield (0, createS3Client_service_1.createS3Client)();
            const client = createS3ClientResponse.data;
            const imageUrl = yield (0, s3_request_presigner_1.getSignedUrl)(client, new client_s3_1.GetObjectCommand({
                Bucket: "resumetrackerbucket",
                Key: key,
            }), {
                expiresIn: 60,
            });
            return { status: 200, message: "url downloaded", data: imageUrl };
        }
        catch (err) {
            throw new Error("error in downloadFileFromS3");
        }
    });
}
exports.downloadFileFromS3 = downloadFileFromS3;
