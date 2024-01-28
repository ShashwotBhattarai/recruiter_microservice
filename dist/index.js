"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const fileDownload_route_1 = __importDefault(require("./routes/fileDownload.route"));
const db_config_1 = __importDefault(require("./configs/db.config"));
const getCandidateInfo_route_1 = __importDefault(require("./routes/getCandidateInfo.route"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_output_json_1 = __importDefault(require("../swagger-output.json"));
const logger_config_1 = __importDefault(require("./configs/logger.config"));
const app = (0, express_1.default)();
app.disable("x-powered-by");
const corsOptions = {
    origin: "http://localhost:3000",
};
app.use((0, cors_1.default)(corsOptions));
const port = 3002;
app.use(body_parser_1.default.json());
app.use("/doc", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_output_json_1.default));
(0, db_config_1.default)();
app.use("/recruiter/download", fileDownload_route_1.default);
app.use("/recruiter/getCandidateInfo", getCandidateInfo_route_1.default);
app.listen(port, () => {
    logger_config_1.default.info(`Recruiter Microservice Running at port ${port}`);
    logger_config_1.default.info(`API documentation: http://localhost:3002/doc`);
});
