"use server"

import s3 from "@/lib/s3"
import { DeleteObjectCommand, ListObjectsV2Command, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

import { File } from "./types"
import { requireAuth } from "../auth/queries"

// This is for client side upload URL generation
export async function getUploadUrl(key: string, contentType: string) {
    await requireAuth()
  
  const command = new PutObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
    Key: key,
    ContentType: contentType,
  })

  const url = await getSignedUrl(s3, command, { expiresIn: 3600 })
  return url
}

export async function getFiles(key: string = ""): Promise<File[]> {
  await requireAuth()

  const command = new ListObjectsV2Command({
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
    Prefix: key,
  })

  const response = await s3.send(command)

  return response.Contents?.map((item) => ({
    name: item.Key!,
    url: `${process.env.NEXT_PUBLIC_S3_PUBLIC_URL}/${item.Key!}`,
  })) || [] 
}

export async function deleteFile(key: string) {
  await requireAuth()

  const command = new DeleteObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
    Key: key,
  })

  await s3.send(command)
}