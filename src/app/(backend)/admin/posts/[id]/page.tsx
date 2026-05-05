import PostEditForm from "@/features/post/components/backend/post-edit-form"
import { deletePost, getPost, updatePost } from "@/features/post/queries"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"

interface PostIdPageProps {
  params: Promise<{ id: string }>
}

export default async function PostIdPage({ params }: PostIdPageProps) {
  const { id } = await params
  const post = await getPost(id)

  if (!post) {
    notFound()
  }

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-xl align-middle">
          <Link href={ "/admin/posts" } className="opacity-25 font-light">posts {">"}</Link> { post.title || "edit" }
        </h1>
        <div className="flex gap-2">
          <button
            onClick={ async () => {
              "use server"
              await updatePost(id, { ...post, published: !post.published })
            } }
            className="hover:underline"
          >
            { post.published ? "unpublish" : "publish" }
          </button>
          <button
            onClick={ async () => {
              "use server"
              await deletePost(id)
              redirect("/admin/posts")
            } }
            className="text-red-500 hover:underline decoration-red-500"
          >
            delete
          </button>
        </div>
      </div>

      <PostEditForm
        post={ post }
        onUpdate={ async (updatedPost) => {
          "use server"
          await updatePost(id, updatedPost)
        } }
      />
    </div>
  )
}