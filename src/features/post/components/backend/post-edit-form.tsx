"use client"

import PostEditor from "@/features/post-editor/components/post-editor"
import { Post } from "@/types/post"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface PostEditFormProps {
  post: Post
  onUpdate?: (post: Post) => void
}

export default function PostEditForm({ post, onUpdate }: PostEditFormProps) {
  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)
  
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      onUpdate?.({ ...post, title, content })
      router.refresh()
    }, 500)

    return () => clearTimeout(timer)
  }, [title, content])

  return (
    <div className="max-w-3xl mx-auto">
      <input
        id="title"
        type="text"
        placeholder="Title"
        defaultValue={ post.title }
        onChange={ (e) => setTitle(e.target.value) }
        className="resize-none mt-4 w-full align-middle py-2 text-5xl font-semibold focus:outline-none placeholder:text-gray-300 placeholder:font-normal"
      />

      <PostEditor
        placeholder="Write Something..."
        postId={ post.id }
        defaultContent={ post.content }
        onUpdate={ (content) => setContent(content) }
      />
    </div>
  )
}