"use server"

import s3 from "@/lib/s3"
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

import { ObjectStorageFile } from "./types"
import { requireAuth } from "../auth/queries"
import prisma from "@/lib/prisma"

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

export async function getFiles(key: string = ""): Promise<ObjectStorageFile[]> {
  await requireAuth()

  const files = await prisma.objectStorageFile.findMany({
    where: {
      name: {
        startsWith: key,
      },
    },
  })

  return files as ObjectStorageFile[]
}

export async function saveFile(file: { name: string; url: string }) {
  await requireAuth()

  const newFile = await prisma.objectStorageFile.create({
    data: {
      name: file.name,
      url: file.url,
    },
  })

  return newFile as ObjectStorageFile
}

export async function deleteFile(key: string) {
  await requireAuth()

  const command = new DeleteObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
    Key: key,
  })

  await s3.send(command)

  await prisma.objectStorageFile.deleteMany({
    where: {
      name: key,
    },
  })
}