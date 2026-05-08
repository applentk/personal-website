"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import * as TipTapImage from "@tiptap/extension-image"
import { incrementPublishedPostViews } from "@/features/post/queries"
import type { Post } from "@/features/post/types"
import Image from "next/image"
import { HTMLAttributes, useEffect, useRef, useState } from "react"

interface PostViewProps extends HTMLAttributes<HTMLDivElement> {
  post: Post
}

export default function PostView({ post, ...props }: PostViewProps) {
  const [viewCount, setViewCount] = useState(post.views)
  const hasTrackedViewRef = useRef(false)
  const viewedSessionKey = `post:viewed:${post.id}`

  const editor = useEditor({
    extensions: [StarterKit, TipTapImage.Image],
    content: JSON.parse(post.content || "{}"),
    editable: false,
    immediatelyRender: false,
  })

  useEffect(() => {
    if (hasTrackedViewRef.current) {
      return
    }

    if (sessionStorage.getItem(viewedSessionKey) === "1") {
      hasTrackedViewRef.current = true
      return
    }
    
    sessionStorage.setItem(viewedSessionKey, "pending")
    hasTrackedViewRef.current = true

    void incrementPublishedPostViews(post.id)
      .then((views) => {
        if (typeof views === "number") {
          setViewCount(views)
        }

        sessionStorage.setItem(viewedSessionKey, "1")
      })
      .catch(() => {
        sessionStorage.removeItem(viewedSessionKey)
      })
      
  }, [post.id, viewedSessionKey])

  return (
    <div className="max-w-2xl mx-auto" {...props}>
      <h1 className="text-5xl font-semibold mb-2">{post.title}</h1>

      <div className="flex mb-6 font-serif">
        <span className="text-sm text-gray-500 after:content-['•'] after:mx-2">
          {post.updatedAt.toLocaleDateString("en-UK", { month: "long", day: "numeric", year: "numeric" })}
        </span>
        <span className="text-sm text-gray-500">{viewCount} views</span>
      </div>

      {post.thumbnailUrl && (
        <Image
          src={post.thumbnailUrl}
          alt="Thumbnail"
          loading="eager"
          className="w-full h-80 my-6 rounded-lg object-contain border border-gray-200"
          width={640}
          height={320}
        />
      )}

      <EditorContent editor={editor} className="font-serif" />
    </div>
  )
}
