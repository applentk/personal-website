"use server"

import prisma from "@/lib/prisma"
import s3 from "@/lib/s3";
import { Post } from "@/types/post";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";

export async function getAllPosts() {
  return await prisma.post.findMany();
}

export async function getPost(id: string) {
  return await prisma.post.findFirst({
    where: {
      id: id
    }
  });
}

export async function createPost(data: Partial<Post> = {}) {
  return await prisma.post.create({
    data: {
      title: data.title ?? "",
      content: data.content ?? ""
    }
  });
}

export async function updatePost(id: string, data: Partial<Post>) {
  return await prisma.post.update({
    where: {
      id: id
    },
    data: {
      title: data.title ?? undefined,
      content: data.content ?? undefined
    }
  });
}

export async function deletePost(id: string) {
  return await prisma.post.delete({
    where: {
      id: id
    }
  });
}

export async function uploadImage(postId: string, formData: FormData) {
  const file = formData.get("file") as File | null

  if (!file) {
    throw new Error("No file provided")
  }

  const BUCKET = process.env.S3_BUCKET_NAME!;
  const ext = file.name.split(".").pop() ?? "bin"
  const key = `posts/${postId}/${file.name}.${ext}`

  const buffer = Buffer.from(await file.arrayBuffer())

  await s3.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: buffer,
      ContentType: file.type,
    })
  );

  const s3Endpoint = process.env.S3_URL!
  const url = `${s3Endpoint}/${BUCKET}/${key}`

  return url;
}