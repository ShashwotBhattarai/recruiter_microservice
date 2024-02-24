import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const authCredentialsSchema = new Schema(
  {
    user_id: {
      type: String,
      default: uuidv4,
      unique: true,
      required: true,
    },
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String },
  },
  { timestamps: true },
);

export const AuthCredentials = model("AuthCredentials", authCredentialsSchema);
