"use client"

import FileSelectorDialog from "@/features/files/components/file-selector-dialog"
import TiptapEditor from "@/features/editor/components/tiptap-editor"
import { updatePost } from "@/features/post/queries"
import { Post } from "@/features/post/types"
import { ImageIcon, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"

interface PostEditorProps extends React.HTMLAttributes<HTMLDivElement> {
  initialPost: Post
}

export default function PostEditor({ initialPost, className, ...props }: PostEditorProps) {
  const [title, setTitle] = useState(initialPost.title)
  const [content, setContent] = useState(initialPost.content)
  const [thumbnailUrl, setThumbnailUrl] = useState(initialPost.thumbnailUrl)
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle")

  const [isFileSelectorOpen, setIsFileSelectorOpen] = useState(false)
  const lastSavedRef = useRef({
    title: initialPost.title,
    content: initialPost.content,
    thumbnailUrl: initialPost.thumbnailUrl,
  })
  const saveRequestIdRef = useRef(0)

  useEffect(() => {
    const nextPostState = {
      title,
      content,
      thumbnailUrl,
    }

    if (
      nextPostState.title === lastSavedRef.current.title &&
      nextPostState.content === lastSavedRef.current.content &&
      nextPostState.thumbnailUrl === lastSavedRef.current.thumbnailUrl
    ) {
      return
    }

    setSaveState("saving")

    const timer = setTimeout(() => {
      const requestId = ++saveRequestIdRef.current

      void updatePost(initialPost.id, nextPostState)
        .then(() => {
          if (requestId !== saveRequestIdRef.current) {
            return
          }

          lastSavedRef.current = nextPostState
          setSaveState("saved")
        })
        .catch(() => {
          if (requestId !== saveRequestIdRef.current) {
            return
          }

          setSaveState("error")
        })
    }, 500)

    return () => clearTimeout(timer)
  }, [content, initialPost.id, thumbnailUrl, title])

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

      <div className="flex mt-1">
        <span className="text-sm text-gray-500 after:content-['•'] after:mx-2">
          { initialPost.updatedAt.toLocaleDateString("en-UK", { month: "long", day: "numeric", year: "numeric" }) }
        </span>
        <span className="text-sm text-gray-500 after:content-['•'] after:mx-2">
          { initialPost.views } views
        </span>
        <span className="text-sm text-gray-500">
          {saveState === "saving" && "Saving..."}
          {saveState === "saved" && "Saved"}
          {saveState === "error" && "Save failed"}
        </span>
      </div>

      <div onClick={ () => setIsFileSelectorOpen(true) } className="group">
        { thumbnailUrl ? (
          <div className="relative my-6">
            <button
              type="button"
              aria-label="Remove thumbnail"
              onClick={ (e) => {
                e.stopPropagation()
                setThumbnailUrl(null)
              } }
              className="absolute top-3 right-3 z-10 inline-flex p-1 items-center justify-center rounded-full border border-gray-200 bg-white/90 text-gray-500 shadow-sm transition hover:text-gray-900"
            >
              <X className="h-4 w-4" />
            </button>

            <Image
              src={thumbnailUrl}
              alt="Thumbnail"
              loading="eager"
              className="w-full h-80 rounded-lg object-contain cursor-pointer border border-gray-200"
              width={640}
              height={320}
            />
          </div>
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