import { ObjectStorageFile } from "@/features/files/types"

export type Work = {
  id:            string
  title:         string | null
  description:   string | null
  repositoryUrl: string | null
  published:     boolean
  images:        ObjectStorageFile[]
  technologies:  string[]
  createdAt:     Date
  updatedAt:     Date
}

export type WorkCreate = Partial<Omit<Work, "id" | "createdAt" | "updatedAt" | "images">>
export type WorkUpdate = Partial<Omit<Work, "id" | "createdAt" | "updatedAt">>