"use client"

import FileSelectorDialog from "@/features/files/components/file-selector-dialog"
import TiptapEditor from "@/features/editor/components/tiptap-editor"
import { Post } from "@/features/post/types"
import { ImageIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface PostEditorProps extends React.HTMLAttributes<HTMLDivElement> {
  initialPost: Post
  onUpdate?: (post: Post) => void
}

export default function PostEditor({ initialPost, onUpdate, className, ...props }: PostEditorProps) {
  const [title, setTitle] = useState(initialPost.title)
  const [content, setContent] = useState(initialPost.content)
  const [thumbnailUrl, setThumbnailUrl] = useState(initialPost.thumbnailUrl)

  const [isFileSelectorOpen, setIsFileSelectorOpen] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      onUpdate?.({ ...initialPost, title, content, thumbnailUrl })
      router.refresh()
    }, 500)

    return () => clearTimeout(timer)
  }, [title, content, thumbnailUrl])

  return (
    <div className={`max-w-2xl mx-auto ${className}`} {...props}>
      <FileSelectorDialog
        open={isFileSelectorOpen}
        onClose={() => setIsFileSelectorOpen(false)}
        onSelect={(file) => {
          setThumbnailUrl(file.url)
        }}
      />

      <input
        id="title"
        type="text"
        placeholder="Title"
        defaultValue={ initialPost.title }
        onChange={ (e) => setTitle(e.target.value) }
        className="w-full text-5xl font-semibold focus:outline-none placeholder:text-gray-300 placeholder:font-normal"
      />

      <div className="flex">
        <span className="text-sm text-gray-500 after:content-['•'] after:mx-2">
          { initialPost.updatedAt.toLocaleDateString("en-UK", { month: "long", day: "numeric", year: "numeric" }) }
        </span>
        <span className="text-sm text-gray-500">
          { initialPost.views } views
        </span>
      </div>

      <div onClick={ () => setIsFileSelectorOpen(true) } className="group">
        { thumbnailUrl ? (
          <img
            src={ thumbnailUrl }
            alt="Thumbnail"
            className="w-full h-80 my-6 rounded-lg object-contain cursor-pointer border border-gray-200"
          />
        ) : (
          <div className="w-full h-80 bg-gray-100 my-4 rounded-lg flex items-center justify-center">
            <ImageIcon className="text-gray-400" />
            <span className="text-gray-400 ml-2 text-sm group-hover:underline cursor-default">
              select thumbnail
            </span>
          </div>
        )}
      </div>

      <TiptapEditor
        placeholder="Write Something..."
        defaultContent={ initialPost.content }
        onUpdate={ (content) => setContent(content) }
      />
    </div>
  )
}