import { getAllPosts } from "@/features/post/queries"

export default async function PostPage() {
  const posts = await getAllPosts()

  return (
    <div className="flex flex-col">
      <h6>
        me yapping about me
      </h6>
      <ul className="mt-6 grid grid-cols-3 gap-1 w-full">
        { posts.map((post) => (
          <li key={ post.id } className="border p-2">
            { post.title }
          </li>
        )) }
      </ul>
    </div>
  )
}