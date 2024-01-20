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
exports.createSQSClient = void 0;
const client_sqs_1 = require("@aws-sdk/client-sqs");
const dotenv_1 = __importDefault(require("dotenv"));
const logger_config_1 = __importDefault(require("../configs/logger.config"));
dotenv_1.default.config();
function createSQSClient() {
    return __awaiter(this, void 0, void 0, function* () {
        if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY && process.env.AWS_REGION) {
            const client = new client_sqs_1.SQSClient({
                credentials: {
                    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                },
                region: process.env.AWS_REGION,
            });
            logger_config_1.default.info("SQS Client created");
            return {
                status: 200,
                message: "SQSClient created",
                data: client,
            };
        }
        else {
            logger_config_1.default.error("Unknown error in creating SQS client");
            throw new Error("error in createSQSClient");
        }
    });
}
exports.createSQSClient = createSQSClient;
