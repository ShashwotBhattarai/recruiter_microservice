import express from "express";
import cors from "cors";
import fileDownloadRoute from "./routes/fileDownload.route";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/test-download", fileDownloadRoute);

app.listen(9000);
console.log("server up ...");
