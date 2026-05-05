import type { Post } from "@/types/post"

interface PostFrontendProps {
  post: Post
}

export function PostFrontend({ post }: PostFrontendProps) {
  return (
    <div>
      { post.title }
    </div>
  )
}