import { Request, Response } from "express";
import logger from "../configs/logger.config";
import CandidateService from "../services/candidateInfo.service";
import { ServiceResponse } from "../models/serviceResponse.type";

export default class CandidateController {
  private candidateService = new CandidateService();

  public getAllCandidates(req: Request, res: Response): void {
    (async (): Promise<void> => {
      try {
        const response: ServiceResponse =
          await this.candidateService.findAllCandidates();
        res
          .status(response.status)
          .json({ message: response.message, candidates: response.data });
      } catch (error) {
        logger.error("Unknown error in getAllCandidateController", error);
        res.status(500).json({ message: "Internal server error" });
      }
    })();
  }

  public getOneCandidate(req: Request, res: Response): void {
    (async (): Promise<void> => {
      try {
        const query = { user_id: req.params.user_id };
        const response: ServiceResponse =
          await this.candidateService.findOneCandidate(query);

        res
          .status(response.status)
          .json({ message: response.message, candidate: response.data });
      } catch (error) {
        logger.error("Unknown error in getOneCandidateController", error);
        res.status(500).send({ error: "Internal server error" });
      }
    })();
  }

  public getCVDownloadURL(req: Request, res: Response): void {
    (async (): Promise<void> => {
      try {
        const response: ServiceResponse =
          await this.candidateService.getCVDownloadUrl(req.params.key);

        res
          .status(response.status)
          .json({ message: response.message, url: response.url });
      } catch (error) {
        logger.error("Unknown error in getDownloadURLController", error);
        res.status(500).send({ error: "Internal server error" });
      }
    })();
  }
}
