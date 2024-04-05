import { Request, Response } from "express";
import logger from "../configs/logger.config";

export default class HealthController {
  public checkHealth = (req: Request, res: Response): void => {
    (async (): Promise<void> => {
      logger.info("Recruiter microservice is alive");
      res.status(200).json({ message: "Recruiter microservice is alive" });
    })();
  };
}
