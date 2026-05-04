"use server"

import prisma from "@/lib/prisma"

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

export async function createPost(title: string, content: string) {
  return await prisma.post.create({
    data: {
      title,
      content
    }
  });
}

export async function updatePost(id: string, title: string, content: string) {
  return await prisma.post.update({
    where: {
      id: id
    },
    data: {
      title,
      content
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