"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const fileDownload_route_1 = __importDefault(require("./routes/fileDownload.route"));
const db_connect_1 = __importDefault(require("./database/db.connect"));
const getCandidateInfo_route_1 = __importDefault(require("./routes/getCandidateInfo.route"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
(0, db_connect_1.default)();
app.use("/test-download", fileDownload_route_1.default);
app.use("/getCandidateInfo", getCandidateInfo_route_1.default);
app.listen(9000);
console.log("server up ...");
