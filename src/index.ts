import connectToDatabase from "./configs/db.config";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../swagger-output.json";
import logger from "./configs/logger.config";
import rootRoute from "./routes/root.route";
import app from "./configs/express.config";
import { envVars } from "./configs/envVars.config";

const port = envVars.PORT;

connectToDatabase();

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/recruiter", rootRoute);

app.listen(port, () => {
  logger.info(`Recruiter Microservice Running at port ${port}`);
  logger.info(`API documentation: http://localhost:${port}/doc`);
});
