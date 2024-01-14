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
exports.fileDownloadController = void 0;
const s3_fileDownload_service_1 = require("../services/s3-fileDownload.service");
const sqs_service_1 = require("../services/sqs.service");
const findUserFromS3Key_service_1 = require("../services/findUserFromS3Key.service");
const fileDownloadController = (req, res) => {
    (() => __awaiter(void 0, void 0, void 0, function* () {
        const key = req.body.key;
        try {
            const downloadFileResponse = yield (0, s3_fileDownload_service_1.downloadFileFromS3)(key);
            const findUserResponse = yield new findUserFromS3Key_service_1.FindUser().findUser(key);
            const email = findUserResponse.email;
            const fullname = findUserResponse.fullname;
            const emailPayload = {
                to: email,
                subject: "Hi " + fullname + " " + " Your CV Got Downloaded",
                text: "Dear candidate your CV was downloaded",
            };
            yield new sqs_service_1.SQSService().sendMessageToQueue(emailPayload);
            res.setHeader("Content-Disposition", `attachment; filename=${key}.pdf`);
            res.status(downloadFileResponse.status).send({ url: downloadFileResponse.data });
        }
        catch (error) {
            res.status(500).send({ error: "internal server error" });
        }
    }))();
};
exports.fileDownloadController = fileDownloadController;
