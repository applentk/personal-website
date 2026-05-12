"use client"

import { useAutosave } from "@/hooks/use-auto-save"
import { HTMLAttributes, useState } from "react"
import { Work } from "../types"
import { updateWork } from "../queries"
import Image from "next/image"
import { ImageIcon, XIcon } from "lucide-react"
import FileSelectorDialog from "@/features/files/components/file-selector-dialog"
import StackIcon from "tech-stack-icons";
import { techs } from "@/constants/tech"

interface WorkEditorProps extends HTMLAttributes<HTMLDivElement> {
  initialWork: Work
}

export function WorkEditor({ initialWork, ...props }: WorkEditorProps) {
  const [work, setWork] = useState<Work>(initialWork)
  const [isFileSelectorOpen, setIsFileSelectorOpen] = useState(false)

  const { saveState } = useAutosave({
    data: work,
    onSave: (data) => updateWork(initialWork.id, data)
  })

  return (
    <div className="flex flex-col min-w-0 font-serif" {...props}>
      <FileSelectorDialog
        open={isFileSelectorOpen}
        onSelect={(file) => {
          setWork({ ...work, images: [...(work.images ?? []), file] })
          setIsFileSelectorOpen(false)
        }}
        onClose={() => setIsFileSelectorOpen(false)}
      />
      <input
        type="text"
        value={work.title ?? ""}
        placeholder="name"
        onChange={(e) => setWork({ ...work, title: e.target.value })}
        className="w-full text-5xl font-semibold font-sans focus:outline-none placeholder:text-gray-300 placeholder:font-normal"
      />
      <p className="text-sm text-gray-500">
        {(saveState === "idle" || saveState === "saved") && "All changes saved"}
        {saveState === "saving" && "Saving..."}
        {saveState === "error" && "Save failed"}
      </p>
      <div className="w-full overflow-x-auto mt-4">
        <div className="flex gap-2">
          <div
            onClick={() => setIsFileSelectorOpen(true)}
            className="group size-72 shrink-0 border border-gray-300 border-dashed hover:border-gray-500 rounded-lg flex flex-col items-center justify-center"
          >
            <ImageIcon
              className="text-gray-300 group-hover:text-gray-500"
              size={26}
            />
            <p className="text-sm text-gray-300 mt-1 cursor-default group-hover:text-gray-500 group-hover:underline">
              add images
            </p>
          </div>
          {work.images.map((image) => (
            <div key={image.id} className="shrink-0 relative border border-gray-300 rounded-lg overflow-hidden">
              <button
                type="button"
                aria-label="Remove image"
                onClick={(e) => {
                  e.stopPropagation()
                  setWork({ ...work, images: work.images.filter((img) => img.id !== image.id) })
                }}
                className="absolute top-2 right-2 z-10 inline-flex p-0.5 items-center justify-center rounded-full border border-gray-200 bg-white/90 text-gray-500 shadow-sm transition hover:text-gray-900"
              >
                <XIcon className="h-4 w-4" />
              </button>
              <Image
                width={384}
                height={192}
                src={image.url}
                alt={image.name}
                className="h-72 object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex flex-wrap items-center justify-center gap-2 mt-4">
        {work.technologies.map((tech) => (
          <StackIcon key={tech} name={tech} className="mr-2 size-26" />
        ))}
        <button
          type="button"
          className="text-sm text-gray-500 border border-gray-300 rounded px-2 py-1 hover:border-gray-500"
        >
          + add
        </button>
      </div>
      <textarea
        value={work.description ?? ""}
        placeholder="descriptions"
        onChange={(e) => setWork({ ...work, description: e.target.value })}
        className="w-full text-lg focus:outline-none placeholder:text-gray-300 placeholder:font-normal mt-4"
      />
    </div>
  )
}