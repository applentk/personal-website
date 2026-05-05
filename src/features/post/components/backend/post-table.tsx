"use client"

import type { Post } from "@/types/post"
import { useRouter } from "next/navigation"
import { ComponentProps } from "react"

interface PostTable {
  posts: Post[]
}

const postTableHeaders = ["title", "date created", "last update", "status", "views"]

export function PostTable({ posts, className }: PostTable & ComponentProps<"table">) {
  const router = useRouter()

  return (
    <table className={ className }>
      <thead className="border">
        <tr>
          { postTableHeaders.map((header) =>
            <th key={ header } className="text-start font-semibold bg-gray-50 py-1 pr-8 first:pl-2 last:pr-2">
              { header }
            </th>
          ) }
        </tr>
      </thead>
      <tbody className="font-serif">
        { posts.map((post) => 
          <tr
            onClick={() => router.push(`/admin/posts/${post.id}`)}
            key={ post.id }
            className="border hover:bg-gray-50"
          >
            <td className="w-sm pl-2 pr-8 cursor-default font-sans">
              { post.title || <span className="text-gray-300">No title</span> }
            </td>
            <td className="pr-8 py-2">
              { post.createdAt.toLocaleString("th-TH") }
            </td>
            <td className="pr-8 py-2">
              { post.updatedAt.toLocaleString("th-TH") }
            </td>
            <td className="pr-8 font-sans">
              <span className="outline px-2 py-0.5">
                { post.published ? "published" : "draft" }
              </span>
            </td>
            <td className="pr-2 text">
              { post.views }
            </td>
          </tr>
        ) }
      </tbody>
    </table>
  )
}