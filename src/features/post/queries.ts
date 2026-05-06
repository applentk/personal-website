"use server"

import prisma from "@/lib/prisma"
import { Post } from "@/features/post/types"
import { requireAuth } from "@/features/auth/queries"

export async function getAllPosts(includeDrafts = false) {
  if (includeDrafts) {
    await requireAuth()
  }

  return await prisma.post.findMany({
    where: {
      published: includeDrafts ? undefined : true
    },
    orderBy: {
      updatedAt: "desc"
    }
  })
}

export async function getPost(id: string) {
  return await prisma.post.findFirst({
    where: {
      id: id
    }
  })
}

export async function createPost(data: Partial<Post> = {}) {
  await requireAuth()

  return await prisma.post.create({
    data: {
      title: data.title ?? "",
      content: data.content ?? "",
    }
  })
}

export async function updatePost(id: string, data: Partial<Post>) {
  await requireAuth()

  return await prisma.post.update({
    where: {
      id: id
    },
    data: data
  })
}

export async function deletePost(id: string) {
  await requireAuth()

  return await prisma.post.delete({
    where: {
      id: id
    }
  })
}