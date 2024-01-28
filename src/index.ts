import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fileDownloadRoute from "./routes/fileDownload.route";
import connectToDatabase from "./configs/db.config";
import getCandidateInfoRoute from "./routes/getCandidateInfo.route";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../swagger-output.json";
import logger from "./configs/logger.config";

const app = express();
app.disable("x-powered-by");
const corsOptions = {
	origin: "http://localhost:3000",
};
app.use(cors(corsOptions));
const port = 3002;
app.use(bodyParser.json());
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));
connectToDatabase();

app.use("/recruiter/download", fileDownloadRoute);
app.use("/recruiter/getCandidateInfo", getCandidateInfoRoute);

app.listen(port, () => {
	logger.info(`Recruiter Microservice Running at port ${port}`);
	logger.info(`API documentation: http://localhost:3002/doc`);
});
