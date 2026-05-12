"use client"

import FileSelectorDialog from "@/features/files/components/file-selector-dialog"
import TiptapEditor from "@/features/editor/components/tiptap-editor"
import { updatePost } from "@/features/post/queries"
import { Post } from "@/features/post/types"
import { ImageIcon, X } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import { useAutosave } from "@/hooks/use-auto-save"

interface PostEditorProps extends React.HTMLAttributes<HTMLDivElement> {
  initialPost: Post
}

export default function PostEditor({ initialPost, className, ...props }: PostEditorProps) {
  const [title, setTitle] = useState(initialPost.title)
  const [content, setContent] = useState(initialPost.content)
  const [thumbnail, setThumbnail] = useState(initialPost.thumbnail)
  const { saveState } = useAutosave({
    data: { title, content, thumbnail },
    onSave: (data) => updatePost(initialPost.id, data)
  })

  const [isFileSelectorOpen, setIsFileSelectorOpen] = useState(false)

  return (
    <div className={`max-w-2xl mx-auto ${className}`} {...props}>
      <FileSelectorDialog
        open={isFileSelectorOpen}
        onClose={() => setIsFileSelectorOpen(false)}
        onSelect={(file) => {
          setThumbnail(file)
        }}
      />

      <input
        id="title"
        type="text"
        placeholder="Title"
        defaultValue={ initialPost.title ?? "" }
        onChange={ (e) => setTitle(e.target.value) }
        className="w-full text-5xl font-semibold focus:outline-none placeholder:text-gray-300 placeholder:font-normal"
      />

      <div className="flex mt-1 items-center font-serif">
        <span className="text-sm text-gray-500 after:content-['•'] after:mx-2">
          { initialPost.updatedAt.toLocaleDateString("en-UK", { month: "long", day: "numeric", year: "numeric" }) }
        </span>
        <span className="text-sm text-gray-500">
          { initialPost.views } views
        </span>
        { saveState !== "idle" && (
          <span className="text-sm text-gray-500 before:content-['•'] before:mx-2">
            {saveState === "saving" && "Saving..."}
            {saveState === "saved" && "Saved"}
            {saveState === "error" && "Save failed"}
          </span>
        ) }
      </div>

      <div onClick={ () => setIsFileSelectorOpen(true) } className="group">
        { thumbnail ? (
          <div className="relative my-6">
            <button
              type="button"
              aria-label="Remove thumbnail"
              onClick={ (e) => {
                e.stopPropagation()
                setThumbnail(null)
              } }
              className="absolute top-3 right-3 z-10 inline-flex p-1 items-center justify-center rounded-full border border-gray-200 bg-white/90 text-gray-500 shadow-sm transition hover:text-gray-900"
            >
              <X className="h-4 w-4" />
            </button>

            <Image
              src={thumbnail.url}
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