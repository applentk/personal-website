import "server-only"
import { S3Client } from "@aws-sdk/client-s3"

const endpoint = process.env.S3_URL!
const accessKeyId = process.env.S3_ACCESS_KEY_ID!
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY!

const s3 = new S3Client({
  region: "auto",
  endpoint,
  credentials: { accessKeyId, secretAccessKey }
})

export default s3