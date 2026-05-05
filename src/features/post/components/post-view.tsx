"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import type { Post } from "@/features/post/types"

interface PostViewProps {
  post: Post
}

export default function PostView({ post }: PostViewProps) {
  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: JSON.parse(post.content || "{}"),
    editable: false,
    immediatelyRender: false,
  })

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-5xl font-semibold mb-2">{post.title}</h1>

      <div className="flex mb-6 font-serif">
        <span className="text-sm text-gray-500 after:content-['•'] after:mx-2">
          {post.updatedAt.toLocaleDateString("en-UK", { month: "long", day: "numeric", year: "numeric" })}
        </span>
        <span className="text-sm text-gray-500">{post.views} views</span>
      </div>

      {post.thumbnailUrl && (
        <img
          src={post.thumbnailUrl}
          alt="Thumbnail"
          className="w-full h-80 my-6 rounded-lg object-contain border border-gray-200"
        />
      )}

      <EditorContent editor={editor} className="font-serif" />
    </div>
  )
}
