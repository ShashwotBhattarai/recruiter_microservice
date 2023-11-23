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
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("ima inside fiel download");
    const key = req.body.key;
    const downloadFileResponse = yield new s3_fileDownload_service_1.default().downloadFileToS3(key);
    if (downloadFileResponse.status == 200) {
        res.setHeader("Content-Disposition", `attachment; filename=${key}.pdf`);
        res
            .status(downloadFileResponse.status)
            .send({ url: downloadFileResponse.message });
    }
    else {
        res
            .status(downloadFileResponse.status)
            .send({ error: downloadFileResponse.message });
    }
}));
exports.default = router;
