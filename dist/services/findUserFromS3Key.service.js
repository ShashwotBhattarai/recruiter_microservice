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
exports.FindUser = void 0;
const candidateInfo_model_1 = require("../database/models/candidateInfo.model");
class FindUser {
    findUser(key) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield candidateInfo_model_1.CandidateInfo.findOne({ aws_file_key: key });
                const email = response === null || response === void 0 ? void 0 : response.email;
                const fullname = response === null || response === void 0 ? void 0 : response.fullname;
                return {
                    status: 200,
                    email: email,
                    fullname: fullname,
                };
            }
            catch (err) {
                return {
                    status: 500,
                    message: err,
                };
            }
        });
    }
}
exports.FindUser = FindUser;
