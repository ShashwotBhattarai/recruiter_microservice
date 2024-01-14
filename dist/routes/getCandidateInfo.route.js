"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const getAllcandidate_controller_1 = require("../controllers/getAllcandidate.controller");
const getOneCandidate_controller_1 = require("../controllers/getOneCandidate.controller");
const router = express_1.default.Router();
router.get("/all", (0, auth_middleware_1.authMiddleware)(["recruiter"]), getAllcandidate_controller_1.getAllcandidateController);
router.get("/:user_id", (0, auth_middleware_1.authMiddleware)(["recruiter"]), getOneCandidate_controller_1.getOneCandidateController);
exports.default = router;
