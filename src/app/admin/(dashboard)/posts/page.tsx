import { PostTable } from "@/features/post/components/post-table"
import { createPost, getAllPosts } from "@/features/post/queries"
import { redirect } from "next/navigation"

export default async function PostsPage() {
  const posts = await getAllPosts()

  async function onClickCreatePost() {
    "use server"
    const newPost = await createPost()
    redirect(`/admin/posts/${newPost.id}`)
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-start">
        <h1 className="text-lg">
          posts
        </h1>
        <button onClick={ onClickCreatePost } className="px-2 py-1 border hover:cursor-default">
          new post
        </button>
      </div>
      
      <PostTable
        posts={ posts }
        className="mt-4"
      />
    </div>
  )
}