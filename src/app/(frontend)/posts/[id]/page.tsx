import PostView from "@/features/post/components/post-view"
import { getPost } from "@/features/post/queries"
import { notFound } from "next/navigation"

interface PostIdPageProps {
  searchParams: Promise<{ id: string }>
}

export default async function PostIdPage({ searchParams }: PostIdPageProps) {
  const { id } = await searchParams
  const post = await getPost(id)

  if (!post) {
    notFound()
  }

  return <PostView post={post} className="mt-16" />
}
