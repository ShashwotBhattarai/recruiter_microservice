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
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
class S3FileDownloadService {
    downloadFileToS3(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = new client_s3_1.S3Client({
                credentials: {
                    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
                    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
                },
                region: process.env.AWS_REGION,
            });
            const command = new client_s3_1.GetObjectCommand({
                Bucket: "resumetrackerbucket",
                Key: key,
            });
            try {
                const imageUrl = yield (0, s3_request_presigner_1.getSignedUrl)(client, command, {
                    expiresIn: 60,
                });
                return { status: 200, message: imageUrl };
            }
            catch (err) {
                return { status: 500, message: err };
            }
        });
    }
}
exports.default = S3FileDownloadService;
