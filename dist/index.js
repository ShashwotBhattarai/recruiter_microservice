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
app.disable("x-powered-by");
let corsOptions = {
    origin: "http://localhost:3000/",
};
app.use((0, cors_1.default)(corsOptions));
const port = 3002;
(0, db_connect_1.default)();
app.use("/recruiter/download", fileDownload_route_1.default);
app.use("/recruiter/getCandidateInfo", getCandidateInfo_route_1.default);
app.listen(port, () => {
    console.log(`Recruiter Microservice Running at port ${port}`);
});
