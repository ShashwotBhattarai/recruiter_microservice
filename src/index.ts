import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fileDownloadRoute from "./routes/fileDownload.route";
import connectToDatabase from "./database/db.connect";
import getCandidateInfoRoute from "./routes/getCandidateInfo.route";

const app = express();
app.disable("x-powered-by");
const corsOptions = {
	origin: "http://localhost:3000/",
};
app.use(cors(corsOptions));
const port = 3002;
app.use(bodyParser.json());
connectToDatabase();

app.use("/recruiter/download", fileDownloadRoute);
app.use("/recruiter/getCandidateInfo", getCandidateInfoRoute);

app.listen(port, () => {
	console.log(`Recruiter Microservice Running at port ${port}`);
});
