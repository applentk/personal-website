import { S3Client } from "@aws-sdk/client-s3";

const endpoint = process.env.S3_URL;
if (!endpoint) {
  throw new Error("S3_URL is not set in .env")
}

const accessKeyId = process.env.S3_ACCESS_KEY_ID;
if (!accessKeyId) {
  throw new Error("S3_ACCESS_KEY_ID is not set in .env")
}

const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;
if (!secretAccessKey) {
  throw new Error("S3_SECRET_ACCESS_KEY is not set in .env")
}

const s3 = new S3Client({
  region: "auto",
  endpoint,
  credentials: { accessKeyId, secretAccessKey }
});

export default s3;