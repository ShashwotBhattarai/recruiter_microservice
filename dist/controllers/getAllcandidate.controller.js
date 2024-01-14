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
exports.getAllcandidateController = void 0;
const candidateInfo_model_1 = require("../database/models/candidateInfo.model");
const getAllcandidateController = (req, res) => {
    (() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const candidates = yield candidateInfo_model_1.CandidateInfo.find();
            if (candidates == null) {
                res.status(404).json({ message: "No candidates found" });
            }
            else {
                res.status(200).send(candidates);
            }
        }
        catch (error) {
            res.status(500).json({ error: "internal server error" });
        }
    }))();
};
exports.getAllcandidateController = getAllcandidateController;
