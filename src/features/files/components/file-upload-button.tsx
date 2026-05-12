"use client"

import type { ObjectStorageFile } from "@/features/files/types"
import FilePickerButton from "@/features/files/components/file-picker-button"
import { getUploadUrl, saveFile } from "@/features/files/queries"
import { ButtonHTMLAttributes, useState } from "react"
import { LoaderCircleIcon } from "lucide-react"

interface FileUploadButtonPropsMultiple extends ButtonHTMLAttributes<HTMLButtonElement> {
  multiple: true
  onFileUploaded?: (file: ObjectStorageFile[]) => void
}

interface FileUploadButtonPropsSingle extends ButtonHTMLAttributes<HTMLButtonElement> {
  multiple?: false
  onFileUploaded?: (file: ObjectStorageFile) => void
}

type FileUploadButtonProps = FileUploadButtonPropsMultiple | FileUploadButtonPropsSingle

export function FileUploadButton({ onFileUploaded, multiple, ...props }: FileUploadButtonProps) {
  const [isUploading, setIsUploading] = useState(false)
  
  async function handleFileSelected(files: File[] | File) {
    setIsUploading(true)

    await Promise.all(
      (Array.isArray(files) ? files : [files]).map(async (file) => {
        const url = await getUploadUrl(file.name, file.type)
        await fetch(url, {
          method: "PUT",
          headers: { "Content-Type": file.type },
          body: file,
        })
      })
    )

    setIsUploading(false)

    const uploadedFiles = (Array.isArray(files) ? files : [files]).map((file) => ({
      name: file.name,
      url: `${process.env.NEXT_PUBLIC_S3_PUBLIC_URL}/${file.name}`,
    }))
    
    const savedFiles = await Promise.all(uploadedFiles.map((file) => saveFile(file)));

    if (multiple) {
      onFileUploaded?.(savedFiles)
    }
    else {
      onFileUploaded?.(savedFiles[0])
    }
  }

  return (
    <FilePickerButton
      multiple={multiple}
      onFileSelected={handleFileSelected}
      disabled={isUploading}
      {...props}
    >
      {isUploading ? <span className="flex items-center justify-center"><LoaderCircleIcon className="animate-spin" /></span> : "upload file"}
    </FilePickerButton>
  )
}
