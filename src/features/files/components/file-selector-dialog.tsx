"use client"

import { useEffect, useRef, useState } from "react"
import { getFiles } from "@/features/files/queries"
import type { File } from "@/features/files/types"
import FileCard from "@/features/files/components/file-card"
import { FileUploadButton } from "./file-upload-button"

interface FileSelectorDialogProps {
  open: boolean
  onClose: () => void
  onSelect: (file: File) => void
}

export default function FileSelectorDialog({ open, onClose, onSelect }: FileSelectorDialogProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const [files, setFiles] = useState<File[]>([])

  useEffect(() => {
    if (open) {
      ref.current?.showModal()
      getFiles().then(setFiles)
    }
    else {
      ref.current?.close()
    }
  }, [open])

  function handleSelect(file: File) {
    onSelect(file)
    onClose()
  }

  return (
    <dialog ref={ref} onClose={onClose} className="p-4 max-w-180 w-full max-md:max-w-[95%] m-auto backdrop:bg-black/40">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg">select file</h2>
        <button onClick={onClose} className="px-2 py-1 border hover:cursor-default">close</button>
      </div>

      <div className="grid grid-cols-4 gap-2 max-h-[60vh] overflow-y-auto">
        <FileUploadButton
          multiple={false}
          className="px-2 py-1 border border-gray-300 text-gray-400 hover:cursor-default"
          onFileUploaded={handleSelect}
        />
        {files.map((file) => (
          <button
            key={file.name}
            onClick={() => handleSelect(file)}
            className="text-left"
          >
            <FileCard file={file} />
          </button>
        ))}
      </div>
    </dialog>
  )
}
