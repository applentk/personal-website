"use server"

import prisma from "@/lib/prisma"
import { Work, WorkCreate, WorkUpdate } from "./types"
import { requireAuth } from "@/features/auth/queries"

export async function getPublishedWorks() {
  return await prisma.work.findMany({
    where: { published: true },
    include: { images: true },
    orderBy: { createdAt: "desc" },
  })
}

export async function getPublishedWork(id: string) {
  return await prisma.work.findFirst({
    where: { id, published: true },
    include: { images: true },
  }) 
}

export async function getWorks(): Promise<Work[]> {
  await requireAuth()

  return await prisma.work.findMany({
    include: { images: true },
    orderBy: {
      createdAt: "desc",
    },
  }) 
}

export async function getWork(id: string): Promise<Work | null> {
  await requireAuth()

  return await prisma.work.findFirst({
    where: { id },
    include: { images: true },
  })
}

export async function createWork(data: WorkCreate = {}): Promise<Work> {
  await requireAuth()

  return await prisma.work.create({
    include: { images: true },
    data: data
  });
}

export async function updateWork(id: string, data: WorkUpdate): Promise<Work> {
  await requireAuth()

  const { images, ...workData } = data
  
  return await prisma.work.update({
    where: { id },
    include: { images: true },
    data: {
      ...workData,
      images: {
        set: images?.map((image) => ({ id: image.id })),
      }
    },
  });
}

export async function deleteWork(id: string): Promise<void> {
  await requireAuth()
  await prisma.work.delete({ where: { id } });
}