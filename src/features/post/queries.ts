"use server"

import prisma from "@/lib/prisma"
import { Post } from "@/features/post/types"
import { requireAuth } from "@/features/auth/queries"

export async function getAllPosts() {
  await requireAuth()

  return await prisma.post.findMany({
    include: { thumbnail: true },
    orderBy: {
      updatedAt: "desc"
    }
  })
}

export async function getPost(id: string) {
  return await prisma.post.findFirst({
    where: { id },
    include: { thumbnail: true },
  })
}

export async function getPublishedPosts() {
  return await prisma.post.findMany({
    where: { published: true },
    include: { thumbnail: true },
    orderBy: { updatedAt: "desc" },
  })
}

export async function getPublishedPost(id: string) {
  return await prisma.post.findFirst({
    where: { id, published: true },
    include: { thumbnail: true },
  })
}

export async function incrementPublishedPostViews(id: string) {
  const updatedPost = await prisma.$transaction(async (tx) => {
    const post = await tx.post.findFirst({
      where: {
        id,
        published: true,
      },
      select: { id: true },
    })

    if (!post) {
      return null
    }

    return await tx.post.update({
      where: { id },
      data: {
        views: {
          increment: 1,
        },
      },
      select: {
        views: true,
      },
    })
  })

  return updatedPost?.views ?? null
}

export async function createPost(data: Partial<Post> = {}) {
  await requireAuth()

  return await prisma.post.create({
    data: {
      title: data.title,
      content: data.content,
    }
  })
}

export async function updatePost(id: string, data: Partial<Post>) {
  await requireAuth()

  const { thumbnail, ...scalarData } = data

  return await prisma.post.update({
    where: { id },
    data: {
      ...scalarData,
      ...(thumbnail !== undefined && {
        thumbnail: thumbnail
          ? { connect: { id: thumbnail.id } }
          : { disconnect: true },
      }),
    },
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