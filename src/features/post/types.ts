import { ObjectStorageFile } from "@/features/files/types"

export type Post = {
  id:           string
  title:        string | null
  content:      string | null
  thumbnail:    ObjectStorageFile | null
  views:        number
  published:    boolean
  createdAt:    Date
  updatedAt:    Date
}