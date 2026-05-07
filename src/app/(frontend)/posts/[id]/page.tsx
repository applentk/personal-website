import PostView from "@/features/post/components/post-view"
import { getPublishedPost } from "@/features/post/queries"
import { notFound } from "next/navigation"

interface PostIdPageProps {
  params: Promise<{ id: string }>
}

export default async function PostIdPage({ params }: PostIdPageProps) {
  const { id } = await params
  const post = await getPublishedPost(id)

  if (!post) {
    notFound()
  }

  return <PostView post={post} className="mt-16" />
}
