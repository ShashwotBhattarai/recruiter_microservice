import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const candidateInfoSchema = new Schema(
  {
    user_id: {
      type: String,
      default: uuidv4,
      unique: true,
      required: true,
    },
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    phone_number: { type: String, required: true },
    local_file_name: { type: String },
    file_size_in_bytes: { type: Number },
    s3_default_bucket_file_key: { type: String, required: true },
    s3_bad_bucket_file_key: { type: String, required: true },
    createdBy: { type: String },
    updatedBy: { type: String },
  },
  { timestamps: true },
);

export const CandidateInfo = model("CandidateInfo", candidateInfoSchema);
