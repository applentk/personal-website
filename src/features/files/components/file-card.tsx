"use client"

import type { File } from "@/features/files/types"
import Image from "next/image"
import Link from "next/link"

interface FileCardProps {
  file: File
  onDelete?: (file: File) => void
}

export default function FileCard({ file, onDelete }: FileCardProps) {
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
              onClick={(e) => {
                e.preventDefault()
                onDelete?.(file)
              }}
              className="px-2 m-2 text-sm text-red-500 border border-red-500 hover:underline"
            >
              del
            </button>
          ) }
        </div>
      </div>
    </div>
  )
}