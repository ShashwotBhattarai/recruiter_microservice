import { Request, Response } from "express";
import logger from "../configs/logger.config";
import CandidateService from "../services/candidateInfo.service";
import { ServiceResponse } from "../models/serviceResponse.type";
import GetDownloadURL from "../services/downloadUrl.service";

export default class GetCandidateInfoController {
  public getAllcandidate(req: Request, res: Response): void {
    (async (): Promise<void> => {
      try {
        const response: ServiceResponse =
          await new CandidateService().findAllCandidates();
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
        const query = { user_id: req.params.user };
        const response: ServiceResponse =
          await new CandidateService().findOneCandidate(query);

        res
          .status(response.status)
          .json({ message: response.message, candidate: response.data });
      } catch (error) {
        logger.error("Unknown error in getOneCandidateController", error);
        res.status(500).send({ error: "internal server error" });
      }
    })();
  }

  public getDownloadURL(req: Request, res: Response): void {
    (async (): Promise<void> => {
      try {
        const response: ServiceResponse =
          await new GetDownloadURL().getCVDownloadUrl(req.params.user_id);

        res
          .status(response.status)
          .json({ message: response.message, url: response.url });
      } catch (error) {
        logger.error("Unknown error in getDownloadURLController", error);
        res.status(500).send({ error: "internal server error" });
      }
    })();
  }
}
