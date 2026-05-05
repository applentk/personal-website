import { PostTable } from "@/features/post/components/backend/post-table"
import { createPost, getAllPosts } from "@/features/post/queries"
import { redirect } from "next/navigation"

export default async function PostsPage() {
  const posts = await getAllPosts(true)

  async function onClickCreatePost() {
    "use server"
    const newPost = await createPost()
    redirect(`/admin/posts/${newPost.id}`)
  }

  return (
    <div className="flex flex-col">
      <h1 className="text-xl">
        posts
      </h1>
      
      <button onClick={ onClickCreatePost } className="ml-auto mt-2 px-2 py-1 border hover:cursor-default">
        new post
      </button>
      
      <PostTable
        posts={ posts }
        className="mt-4"
      />
    </div>
  )
}