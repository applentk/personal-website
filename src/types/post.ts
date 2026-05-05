export type Post = {
  id:        string
  title:     string
  content:   string | null
  views:     number
  published: boolean
  createdAt: Date
  updatedAt: Date
}