import { SQSClient } from "@aws-sdk/client-sqs";
export type ServiceResponse = {
  status: number;
  message: string;
  token?: string;
  client?: SQSClient;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  url?: string;
};
