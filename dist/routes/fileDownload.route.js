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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const s3_fileDownload_service_1 = __importDefault(require("../services/s3-fileDownload.service"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const sqs_service_1 = require("../services/sqs.service");
const findUserFromS3Key_service_1 = require("../services/findUserFromS3Key.service");
const router = express_1.default.Router();
router.post("/", (0, auth_middleware_1.authMiddleware)(["recruiter"]), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const token = req.headers.authorization?.slice(7);
    const key = req.body.key;
    const downloadFileResponse = yield new s3_fileDownload_service_1.default().downloadFileToS3(key);
    if (downloadFileResponse.status == 200) {
        const findUserResponse = yield new findUserFromS3Key_service_1.FindUser().findUser(key);
        if (findUserResponse.status == 200) {
            const email = findUserResponse.email || "";
            const fullname = findUserResponse.fullname;
            const emailPayload = {
                to: email,
                subject: "Hi " + fullname + " " + " Your CV Got Downloaded",
                text: "Dear candidate your CV was downloaded",
            };
            yield new sqs_service_1.SQS_Service().sendMessageToQueue(emailPayload);
        }
        res.setHeader("Content-Disposition", `attachment; filename=${key}.pdf`);
        res.status(downloadFileResponse.status).send({ url: downloadFileResponse.message });
    }
    else {
        res.status(downloadFileResponse.status).send({ error: downloadFileResponse.message });
    }
}));
exports.default = router;
