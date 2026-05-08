"use client"

import type { File } from "@/features/files/types"
import { LoaderCircleIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface FileCardProps {
  file: File
  onDelete?: (file: File) => Promise<void>
}

export default function FileCard({ file, onDelete }: FileCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const extension = file.name.split(".").pop()?.toLowerCase()
  const isImage = extension && ["jpg", "jpeg", "png", "gif"].includes(extension)

  return (
    <div>
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        {isImage ? (
          <Image
            src={file.url}
            alt={file.name}
            className="w-full h-40 object-contain bg-gray-50"
            width={512}
            height={512}
          />
        ) : (
          <div className="w-full h-40 flex items-center justify-center bg-gray-100">
            <span className="text-sm text-gray-500 truncate px-2">
              {file.name}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <Link href={file.url} target="_blank" className="p-2 text-sm truncate hover:underline cursor-default">
            {file.name}
          </Link>
          
          { onDelete && (
            <button
              onClick={async (e) => {
                e.preventDefault()
                setIsDeleting(true)
                await onDelete?.(file)
                setIsDeleting(false)
              }}
              disabled={isDeleting}
              className="px-2 m-2 text-sm text-red-500 border border-red-500 rounded-sm hover:underline"
            >
              {isDeleting ? <LoaderCircleIcon className="animate-spin size-5 py-1" /> : "del"}
            </button>
          ) }
        </div>
      </div>
    </div>
  )
}