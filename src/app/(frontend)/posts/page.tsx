import { PostCard } from "@/features/post/components/post-card"
import { getPublishedPosts } from "@/features/post/queries"

export default async function PostPage() {
  const posts = await getPublishedPosts()

  return (
    <div className="flex flex-col mt-20">
      <h1 className="text-3xl font-semibold self-center text-center">
        about me yapping about me
      </h1>
      <ul className="mt-6 grid grid-cols-2 gap-2 w-full">
        {posts.map((post) => (
          <li key={post.id}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </div>
  )
}