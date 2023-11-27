import express from "express";
import cors from "cors";
import fileDownloadRoute from "./routes/fileDownload.route";
import connectToDatabase from "./database/db.connect";
import getCandidateInfoRoute from "./routes/getCandidateInfo.route";

const app = express();
app.use(cors());
app.use(express.json());
const port = 3002;

connectToDatabase();

app.use("/test-download", fileDownloadRoute);
app.use("/getCandidateInfo", getCandidateInfoRoute);

app.listen(port, () => {
	console.log(`Recruiter Microservice Running at port ${port}`);
});
