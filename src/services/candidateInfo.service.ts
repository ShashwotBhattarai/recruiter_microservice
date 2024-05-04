import logger from "../configs/logger.config";
import { CandidateInfo } from "../entities/candidateInfo.entity";
import { ServiceResponse } from "../models/serviceResponse.type";
import { EmailerService } from "./emailer.service";
import S3Service from "./s3.service";

export default class CandidateService {
  private s3Service = new S3Service();
  private emailerService = new EmailerService();

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

  public async getCVDownloadUrl(key: string): Promise<ServiceResponse> {
    try {
      const downloadFileResponse =
        await this.s3Service.getDownloadURLFromS3(key);

      const query = { s3_default_bucket_file_key: key };

      const findUserResponse = await this.findOneCandidate(query);

      const email = findUserResponse.data.email;
      const username = findUserResponse.data.fullname;

      await this.emailerService.sendEmail(email, username);
      logger.info("Signed Url downloaded downloaded");

      return {
        status: 200,
        message: "Signed Url Downloaded",
        url: downloadFileResponse.url,
      };
    } catch (error) {
      logger.error("Error in Download URL download", error);
      throw new Error("Unknown error in Download URL download");
    }
  }
}
