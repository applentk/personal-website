"use client"

import type { Post } from "@/features/post/types"
import { ImageIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/posts/${post.id}`} className="block p-2 group cursor-default">
      {post.thumbnail ? (
        <Image
          src={post.thumbnail.url}
          alt={post.title ?? ""}
          loading="eager"
          width={400}
          height={225}
          className="w-full h-52 object-contain mb-2 rounded-lg border border-gray-300"
        />
      ) : (
        <div className="w-full h-52 flex items-center justify-center gap-1 mb-2 rounded-lg border border-gray-300">
          <ImageIcon
            className="text-gray-400"
          />
        </div>
      )}
      <h1 className="text-2xl font-semibold group-hover:underline">
        { post.title }
      </h1>
      
      <p className="text-gray-500 font-serif">
        <span className="text-sm text-gray-500">
          {post.updatedAt.toLocaleDateString("en-UK", { month: "long", day: "numeric", year: "numeric" })}
        </span>
      </p>
    </Link>
  )
}