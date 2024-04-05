import logger from "../configs/logger.config";
import { CandidateInfo } from "../entities/candidateInfo.entity";
import { ServiceResponse } from "../models/serviceResponse.type";

export default class CandidateService {
  public async findOneCandidate(query: object): Promise<ServiceResponse> {
    try {
      const res = await CandidateInfo.findOne(query);

      if (res === null) {
        logger.error("Candidate with this id doesn't exists");
        return {
          status: 404,
          message: "Candidate with this id doesn't exists",
        };
      } else {
        logger.info("Candidate found");
        return {
          status: 200,
          message: "Candidate found",
          data: res,
        };
      }
    } catch (error) {
      logger.error("Unknown error in findOneCandidate", error);
      throw new Error("Unknown error in findOneCandidate");
    }
  }

  public async findAllCandidates(): Promise<ServiceResponse> {
    try {
      const res = await CandidateInfo.find();

      if (res === null) {
        return {
          status: 404,
          message: "No candidate exists",
        };
      } else {
        return {
          status: 200,
          message: "Candidates found",
          data: res,
        };
      }
    } catch (error) {
      logger.error("Unknown error in findAllCandidate", error);
      throw new Error("Unknown error in findAllCandidate");
    }
  }
}
